import '@polymer/polymer/lib/utils/boot.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

let PiePlayerMixinInternal = (superClass) => {
    return class extends superClass {
        constructor() {
            super();
        }
        static get properties() {
            return {
                language: {
                    type: String,
                    value: () => {
                        let language = window.navigator.userLanguage || window.navigator.language
                        return language === 'hu' ? 'hu' : 'hu';
                    },
                },
                playback: {
                    type: Boolean,
                    value: false,
                    notify: true,
                    observer: 'onPlaybackChanged'
                },
                activeSounds: {
                    type: Array,
                    value: () => []
                },
                lookahead: {
                    type: Number,
                    value: 25
                },
                scheduleAheadTime: {
                    type: Number,
                    value: 0.1
                },
                nextIndex: {
                    type: Number,
                    value: 0
                },
                scheduledNotes: {
                    type: Array,
                    value: () => []
                },
                scheduledNotesForDrawing: {
                    type: Array,
                    value: () => []
                },
                playbackShouldStop: {
                    type: Boolean,
                    value: false
                },
                /**
                  * Whether it's the last note playing in the bot sequence
                  */
                lastBotNote: Boolean,
                /**
                  * Indicates if user has heard more than one note.
                  * Used to avoid the user constantly stopping playback and
                  * trying out the notes without loosing score.
                  */
                userStoppedPlaybackAfterHearingMultipleNotes: Boolean
            }
        }
        connectedCallback() {
            super.connectedCallback();
            this.init();
        }
        startPlayback() {
            // Initialize audio context if not running already
            if (!window.context || window.context.state !== 'running') {
                this.init(this.startPlayback.bind(this));
                return;
            }
            clearTimeout(this.timerID);
            this.scheduledNotes = this.scheduledNotes.map(item => {
                item.time = item.time + window.context.currentTime;
                return item;
            });
            this.draw();
            this.scheduler();
        }
        init(cb) {
            try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!window.context) {
                    window.context = new AudioContext();
                }
                if (window.context.state !== 'running') {
                    window.context.resume();
                }

                // Load the samples using the Class declared in ../loadBuffer.js
                window.bufferLoader = new BufferLoader(
                    window.context,
                    this.sampleList,
                    () => {
                        if (typeof cb === 'function') {
                            cb();
                        }
                    }
                );
                window.bufferLoader.load();
            }
            catch (e) {
                alert('Web Audio API is not supported in this browser');
            }
        }
        playSound(note, userAction, time=0) {
            // Initialize audio context if not running already
            if (!window.context || window.context.state !== 'running') {
                this.init(this.playSound.bind(this, userAction, note, time));
                return;
            }
            // Set up source and start
            return new Promise((resolve, reject) => {
                const mediaInstance = new Media(this.sampleList[note]);
                const source = window.context.createBufferSource();
                const gainNode = window.context.createGain();
                source.buffer = window.bufferLoader.bufferList[note];
                source.connect(gainNode);
                gainNode.connect(window.context.destination);

                // Manually adding a property to be able to determine if it needs to be disconnected
                source.connected = true;
                var currentIndex = this.activeSounds.length;
                source.onended = () => {
                    // This connected = false will be reflected in the activeSounds array, so we can remove it from the array
                    if (source.connected) {
                        source.connected = false;
                        source.disconnect(gainNode);
                        gainNode.disconnect(window.context);
                        for (var i = 0; i < this.activeSounds.length; i++) {
                            // Remove from array if not connected
                            if (!this.activeSounds[i].source.connected) {
                                this.splice('activeSounds', i, 1);
                            }
                        }
                    }
                    resolve();
                };
                mediaInstance.play();
                // source.start(time);
                source.userAction = userAction;
                this.push('activeSounds', {source: source, gainNode: gainNode});
            });
        }
        onPlaybackChanged(newValue, oldValue) {
            // Stop playback
            if (oldValue && !newValue) {
                const currentBatch = this.activeSounds.slice(0);
                // Disconnect any source that is still connected
                for (var i = 0; i < this.activeSounds.length; i++) {
                    // Decrease gain of active sounds before disconnecting
                    this.activeSounds[i].gainNode.gain.exponentialRampToValueAtTime(0.01, window.context.currentTime + 0.1);
                }

                // Timeout to match the gain fade length
                setTimeout(() => {
                    for (var i = 0; i < currentBatch.length; i++) {
                        // Only disconnect bot sounds
                        if (currentBatch[i].source.connected && !currentBatch[i].source.userAction) {
                            this.disconnectSourceAndGain(currentBatch[i].source, currentBatch[i].gainNode);
                            currentBatch[i].source.connected = false;
                        }
                    }
                }, 105);

                this.set('activeSounds', []);
                this.set('scheduledNotesForDrawing', []);
                clearTimeout(this.timerID);
                this.nextIndex = 0;

                // If playback hasn't completed at least once, reset the playbackIndex
                if (this.playbackIndex < this.scheduledNotes.length - 1) {
                    // User has already played a note when bot melody was generated, but not
                    // fully displayed, and now they are stopping playback again
                    if (this.playbackIndex > 0) {
                        this.userStoppedPlaybackAfterHearingMultipleNotes = true;
                    }

                    this.playbackIndex = -1;
                }

            }
        }
        disconnectSourceAndGain(source, gainNode) {
            source.disconnect(gainNode);
            gainNode.disconnect(window.context);
        }
        /**
         * Loop to set the current note, play it at the right time,
         * call draw for make it appear on screen.
         */
        scheduler() {
            console.log('schedule');
            let currentNote = this.scheduledNotes[this.nextIndex];
            this.playbackShouldStop = false;
            // Keep on going if the playback is active and it's time to play the current note
            while (this.playback
                    && currentNote
                    && currentNote.time < window.context.currentTime + this.scheduleAheadTime) {

                // Is this the last note in the sequence
                const isLastnote = this.nextIndex === this.scheduledNotes.length - 1;

                // Signal last note being played, so user can start playing
                // A small delay not to allow overplaying the last note.
                if (isLastnote) {
                    setTimeout(()=> {
                        this.lastBotNote = true;
                    }, 250);
                }

                // Play note
                this.playSound(currentNote.note, false, currentNote.time).then(() => {

                    // Once tha last note has ended, set the playback and
                    // the last note flags both to false
                    if (isLastnote) {
                        this.playback = false;
                        this.lastBotNote = false;
                    };
                });
                this.push('scheduledNotesForDrawing', { time: currentNote.time } );

                // Proceed to the next note
                this.nextIndex++;
                currentNote = this.scheduledNotes[this.nextIndex];
            }
            if (!currentNote) {
                return;
            };
            this.playbackShouldStop = true;
            this.timerID = window.setTimeout(this.scheduler.bind(this), this.lookahead );
        }
        /**
         * Loop when playback is active.
         * When there is a scheduled note, increment the playback index,
         * which will make the note bar appear on the screen.
         */
        draw() {
            // 
            while (this.scheduledNotesForDrawing.length
                    && this.scheduledNotesForDrawing[0].time <= window.context.currentTime) {
                this.splice('scheduledNotesForDrawing', 0, 1);
                this.playbackIndex = this.playbackIndex + 1;
                console.log('playbackINdex', this.playbackIndex)
            }
            if (!this.playback) {
                window.cancelAnimationFrame(this.drawID);
                return;
            }
            this.drawID = requestAnimationFrame(this.draw.bind(this));
        }
    }
};
export const PiePlayerMixin = dedupingMixin(PiePlayerMixinInternal);
