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
                    value: () => [
                        {note: 1, time: 0},
                        {note: 2, time: 1},
                        {note: 2, time: 2},
                        {note: 4, time: 3},
                        {note: 2, time: 4}
                    ]
                },
                scheduledNotesForDrawing: {
                    type: Array,
                    value: () => []
                }
            }
        }
        connectedCallback() {
            super.connectedCallback();
        }
        startPlayback() {
            this.scheduledNotes = this.scheduledNotes.map(item => {
                item.time = item.time + window.context.currentTime;
                return item;
            });
            console.log('array', JSON.stringify(this.scheduledNotes));
            this.scheduler();
            this.draw();
        }
        playSound(note, time=0) {
            console.log('playing sound', note, time)
            return new Promise((resolve, reject) => {
                this.source = window.context.createBufferSource();
                this.source.buffer = window.bufferLoader.bufferList[note];
                this.source.connect(window.context.destination);
                this.source.onended = resolve;
                this.source.start(time);
                this.push('sources', this.source);
            });
        }
        onPlaybackChanged(newValue, oldValue) {
            // Stop audio
            if (oldValue && !newValue) {
                this.source.disconnect(window.context.destination);
                for (var i = 0; i < this.sources.length; i++) {
                    this.sources[i].stop();
                    this.splice('sources', i);
                }
                this.nextIndex = 0;
            }
        }
        nextNote() {
            this.nextIndex++;
            // Past the last valid index, cancel scheduler
        }
        scheduler() {
            let currentNote;
            do {
                let currentNote = this.scheduledNotes[this.nextIndex];
                let isLastnote = this.nextIndex === this.scheduledNotes.length - 1;
                this.playSound(currentNote.note, currentNote.time).then(() => {
                    console.log('audio end', isLastnote)
                    if (isLastnote) {
                        console.log('Playback stopped', this.timerID);
                        this.playback = false;
                    };
                });
                this.push('scheduledNotesForDrawing', { time: currentNote.time } );
                // console.log('while')
                this.nextNote();
            } while (currentNote && currentNote.time < window.context.currentTime + this.scheduleAheadTime ) {
                currentNote = this.scheduledNotes[this.nextIndex];
            }
            if (!currentNote) {
                console.log('Scheduler stopped');
                return;
            };
            this.timerID = window.setTimeout( this.scheduler.bind(this), this.lookahead );
        }
        draw() {
            while (this.scheduledNotesForDrawing.length && this.scheduledNotesForDrawing[0].time < window.context.currentTime) {
                // currentNote = this.scheduledNotesForDrawing[0].note;
                this.splice('scheduledNotesForDrawing', 0, 1);
                console.log('ATTACK');
                this.playbackIndex = this.playbackIndex + 1;
            }
            if (!this.playback) {
                console.log('Drawing stopped', this.scheduledNotesForDrawing);
                // window.cancelAnimationFrame(this.drawID);
                return;
            }
            this.drawID = requestAnimationFrame(this.draw.bind(this));
        }
    }
};
export const PiePlayerMixin = dedupingMixin(PiePlayerMixinInternal);
