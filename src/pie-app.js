import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import './pie-icons.js';
import './play-button.js';
import { PiePlayerMixin } from './pie-player-mixin.js';

class PieApp extends PiePlayerMixin(PolymerElement) {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment iron-flex-factors">
            :host {
                display: block;
                max-width: 648px;
                max-height: 100vh;
                background: #fafafa;
                margin: 0 auto;
                --cell-size: 70px;
            }
            .wrapper {
                opacity: 1;
                width: calc((var(--cell-size) * 9) + 18px);
                width: 100%;
                height: calc((var(--cell-size) * 9) + 18px);
                height: 110vw;
                background: #22272d;
                padding-top: 64px;
            }
            .top-bar {
                opacity: 1;
                background: #f5f5f5;
                padding: 16px 8px;
            }
            .bottom-bar {
                opacity: 1;
                height: 16px;
            }
            .progress-section {
                background: slategray;
                margin: 0 2px;
            }
            play-button {
                width: 72px;
                height: 72px;
                opacity: 1;
                margin: 0 auto;
            }
            .right {
                background: green;
            }
            .cell {
                border: 1px solid #eee;
                border: 1px solid transparent;
                flex: 1;
                height: var(--cell-size);        
                width: var(--cell-size);
            }           
            .key {
                background: transparent;
            }
            .sector:hover {
                background: #009;
            }
            #note-1 {
                width: 64px;
                height: 64px;
                background: #7EBDC2;
            }
            #note-2 {
                width: 0; 
                height: 0; 
                border-left: 40px solid transparent;
                border-right: 40px solid transparent;
                border-top: 44px solid #EFE6DD;
                transform: rotate(-45deg);
            }
            #note-3 {
                width: 0; 
                height: 0; 
                border-left: 36px solid transparent;
                border-right: 36px solid transparent;
                border-bottom: 66px solid #7e57c2;
            }
            #note-4 {
                width: 64px;
                height: 64px;
                background: #5c6bc0;
                transform: rotate(45deg) scale(0.92);
            }
            #note-5 {
                width: 64px;
                height: 64px;
                background: #F3DFA2;
                border-radius: 50%;
            }
            .concealed {
                background: transparent;
            }
            [hidden] {
                display: none !important;
            }
        </style>
        <div class="top-bar horizontal layout justified">
            <div id="point-counter">71</div>
            <div id="quit-game-trigger">
                <iron-icon icon="pie-icons:close" on-click="quitGame"></iron-icon>
            </div>
        </div>
        <div class="wrapper vertical layout">
            <div class="row horizontal layout">
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell key layout vertical center-center" data-note="0" on-click="hit">
                    <div id="note-1"></div>
                </div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
            </div>

            <div class="row horizontal layout">
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>        
                <div class="cell" on-click="hit"></div>
                <div class="cell key layout vertical center-center" data-note="1" on-click="hit">
                    <div id="note-2"></div>
                </div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
            </div>

            <div class="row horizontal layout">
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell key layout vertical center-center" data-note="3" on-click="hit">
                    <div id="note-5"></div>
                </div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell key layout vertical center-center" data-note="2" on-click="hit">
                    <div id="note-3"></div>
                </div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
            </div>

            <div class="row horizontal layout">
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>   
                <div class="cell key layout vertical center-center" data-note="4" on-click="hit">
                    <div id="note-4"></div>
                </div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
            </div>

            <div class="row horizontal layout">
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
            </div>

            <div class="row horizontal layout">
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>        
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
                <div class="cell" on-click="hit"></div>
            </div>
        </div>
        <div class="bottom-bar horizontal layout">
            <template is="dom-repeat" items="[[botSequence]]">
                <div class$="[[_computeProgressClass(item, index, progressIndex, playbackIndex)]]"></div>
            </template>
        </div>
        <play-button on-click="togglePlayback" playback="[[playback]]"></play-button>
        `;
    }

    static get is() { return 'pie-app'; }
    static get properties() {
        return {
            botSequence: {
                type: Array,
                value: () => []
            },
            userSequence: {
                type: Array,
                value: () => []
            },
            progressIndex: {
                type: Number,
                value: -1
            },
            playbackIndex: {
                type: Number,
                value: -1
            }
        }
    }
    static get observers() {
        return [
        ];
    }
    constructor() {
        super();
        this.generateSequence = this.generateSequence.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    hit(e) {
        e.stopPropagation();
        let note = e.currentTarget.getAttribute('data-note');
        if (!note) {
            return;
        }
        note = parseInt(note);
        const element = e.currentTarget;
        this.playSound(note);
        const currentNoteIndex = this.userSequence.length;
        if (this.botSequence[currentNoteIndex].noteIndex === note) {
            console.log('right');
            e.currentTarget.style.borderColor = 'green';
            setTimeout(() => element.style.borderColor = '#eee', 500);
            this.push('userSequence', note);
            this.progressIndex = this.progressIndex + 1;
            this.checkGame();
        } else {
            console.log('wrong');
            e.currentTarget.style.borderColor = 'red';
            setTimeout(() => element.style.borderColor = '#eee', 500);
            this.set('userSequence', []);
            this.progressIndex = -1;
        }
    }
    checkGame() {
        if (this.userSequence.length === this.botSequence.length) {
            console.log('win');
        }
    }
    togglePlayback() {
        this.playback = !this.playback;
        if (this.playback) {
            this.playbackIndex = -1;
            this.playBotSequence();
        }
    }
    generateSequence() {
        let botSequenceCandidate;
        do {
            botSequenceCandidate = this.doGenerateSequence();
        } while(!this.arraysDiffer(botSequenceCandidate, this.botSequence));
        this.set('botSequence', botSequenceCandidate);
    }
    doGenerateSequence() {
        let sequence = [];
        this.set('userSequence', []);
        // Number of notes [2..4]
        let numberOfNotes = Math.floor(Math.random() * 3) + 2;
        // dev
        // numberOfNotes = 2;
        const timings = [];
        for (let i = 0; i < numberOfNotes; i++) {
            do {
                // Randomly choose note index [0..4] and set length to normal crotchet
                sequence[i] = { noteIndex: Math.floor(Math.random() * 4 + 1), length: 4 };
            // Repeat until no consecutive notes are the same
            } while (sequence[i].noteIndex === sequence[i - 1] &&sequence[i - 1].noteIndex);
        }
        // Going through the crotchet values and replace some with quavers
        this.indexesToTransform = this.indexesToTransform || [];

        // ForEach while adding new items to the array
        sequence.forEach((item, index) => {
            // 65% times don't transform to quavers 
            if (Math.random() <= 0.65) {
                return;
            }
            this.push('indexesToTransform', index);
        });
        for (let j = 0; j < this.indexesToTransform.length; j++) {
            let indexToTransform = this.indexesToTransform[j];
            sequence[indexToTransform].length = 2;
            //adding quaver
            sequence.splice(indexToTransform, 0, { noteIndex: Math.floor(Math.random() * 4 + 1), length: 2 });
        }
        console.log('botSequence', JSON.stringify(sequence));
        return sequence;
    }
    arraysDiffer(arr1, arr2) {
        return arr1.length !== arr2.length || arr1.filter((item, index) => item !== arr2[index]).length > 0;
    }
    playBotSequence() {
        // DEMO START
        this.set('botSequence', []);
        // DEMO END
        if (this.botSequence.length === 0) {
            this.generateSequence();
        }
        this.playback = true;
        let currentTime = 0;
        let tempArray = [];
        for (let k = 0; k < this.botSequence.length; k++) {
            let currentNote = this.botSequence[k];
            tempArray.push({
                note: currentNote.noteIndex,
                time: currentTime
            });
            // Add note length to the currentTime
            currentTime += currentNote.length * 0.25;
        }
        this.set('scheduledNotes', tempArray);
        console.log('this is scheduled notes', this.scheduledNotes);
        setTimeout(this.startPlayback.bind(this), 320);
    }
    _computeProgressClass(item, itemIndex, progressIndex, playbackIndex) {
        let classString = 'progress-section';
        if (item.length === 2) {
            classString += ' flex';
        } else {
            classString += ' flex-2'
        }
        if (itemIndex > playbackIndex) {
            classString += ' concealed';
        }
        return classString;
    }
}
customElements.define(PieApp.is, PieApp);
