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
                sources: {
                    type: Array,
                    value: () => []
                },
                gainNode: Object,
                attackStatus: {
                    type: Number,
                    value: 1
                },
                minimumVolume: {
                    type: Number,
                    value: 0
                },
                previousAverage: {
                    type: Number,
                    value: 0
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
                sampleStartIndex: {
                    type: Number,
                    value: 0
                },
                lastBotNote: Boolean
            }
        }
        connectedCallback() {
            super.connectedCallback();
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
            this.scheduler();
            this.draw();
        }
        init(cb) {
            console.log('init')
            try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!window.context) {
                    window.context = new AudioContext();
                }
                if (window.context.state !== 'running') {
                    window.context.resume();
                }
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
        playSound(note, time=0) {
            // Initialize audio context if not running already
            if (!window.context || window.context.state !== 'running') {
                this.init(this.playSound.bind(this, note, time));
                return;
            }
            return new Promise((resolve, reject) => {
                this.source = window.context.createBufferSource();
                this.source.buffer = window.bufferLoader.bufferList[note + this.sampleStartIndex];
                this.source.connect(window.context.destination);
                // Manually adding a property to be able to determine if it needs to be disconnected
                this.source.connected = true;
                this.source.onended = () => {
                    this.source.connected = false;
                    resolve();
                };
                this.source.start(time);
                this.push('sources', this.source);
            });
        }
        onPlaybackChanged(newValue, oldValue) {
            // Stop audio
            if (oldValue && !newValue) {
                for (var i = 0; i < this.sources.length; i++) {
                    if (this.sources[i].connected) {
                        this.sources[i].disconnect(window.context.destination);
                        this.sources[i].connected = false;
                    }
                    this.sources[i].stop();
                    // this.splice('sources', i);
                }
                clearTimeout(this.timerID);
                this.set('sources', []);
                this.nextIndex = 0;

                // If playback hasn't completed at least once, reset the playbackIndex
                if (this.playbackIndex < this.scheduledNotes.length - 1) {
                    this.playbackIndex = -1;
                }
            }
        }
        nextNote() {
            this.nextIndex++;
        }
        scheduler() {
            let currentNote = this.scheduledNotes[this.nextIndex];
            while (this.playback && currentNote && currentNote.time < window.context.currentTime + this.scheduleAheadTime) {
                let isLastnote = this.nextIndex === this.scheduledNotes.length - 1;
                // Signal last note being played, so user can start playing
                if (isLastnote) {
                    this.lastBotNote = true;
                }
                this.playSound(currentNote.note, currentNote.time).then(() => {
                    if (isLastnote) {
                        this.playback = false;
                        this.lastBotNote = false;
                    };
                });
                this.push('scheduledNotesForDrawing', { time: currentNote.time } );
                this.nextIndex++;
                currentNote = this.scheduledNotes[this.nextIndex];
            }
            if (!currentNote) {
                return;
            };
            this.timerID = window.setTimeout( this.scheduler.bind(this), this.lookahead );
        }
        draw() {
            while (this.scheduledNotesForDrawing.length && this.scheduledNotesForDrawing[0].time < window.context.currentTime) {
                // currentNote = this.scheduledNotesForDrawing[0].note;
                this.splice('scheduledNotesForDrawing', 0, 1);
                this.playbackIndex = this.playbackIndex + 1;
            }
            if (!this.playback) {
                // window.cancelAnimationFrame(this.drawID);
                return;
            }
            this.drawID = requestAnimationFrame(this.draw.bind(this));
        }
    }
};
export const PiePlayerMixin = dedupingMixin(PiePlayerMixinInternal);
