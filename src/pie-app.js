import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import './pie-icons.js';
import { PiePlayerMixin } from './pie-player-mixin.js';

class PieApp extends PiePlayerMixin(PolymerElement) {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment">
            :host {
                display: block;
                max-width: 740px;
                background: #fafafa;
                margin: 0 auto;
                --cell-size: 70px;
            }
            .wrapper {
                opacity: 1;
                width: calc((var(--cell-size) * 9) + 18px);
                height: calc((var(--cell-size) * 9) + 18px);
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
                background: red;
                margin: 0 4px;
            }

            .done {
                background: green;
            }

            button {
                opacity: 0;
                background: transparent;
                border: 1px solid #ddd;
                padding: 8px 40px;
                margin-bottom: 32px;
            }

            .cell {
                border: 1px solid #eee;
                height: var(--cell-size);
                width: var(--cell-size);
            }
            
            .key {
                background: #eee;
            }

            .sector:hover {
                background: #009;
            }

            [hidden] {
                display: none !important;
            }
        </style>
        <button on-click="generateSequence">Go</button>
        <div class="top-bar horizontal layout justified">
            <div id="point-counter">71</div>
            <div id="quit-game-trigger">
                <iron-icon icon="pie-icons:close" on-click="quitGame"></iron-icon>
            </div>
        </div>
        <div class="wrapper horizontal layout wrap">
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell key" data-note="0" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>        
            <div class="cell" on-click="hit"></div>
            <div class="cell key" data-note="1" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell key" data-note="3" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell key" data-note="2" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>   
            <div class="cell key" data-note="4" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>        
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>   
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

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
        <div class="bottom-bar horizontal layout">
            <div class$="[[_computeProgressClass(1, progressIndex)]]"></div>
            <div class$="[[_computeProgressClass(2, progressIndex)]]"></div>
            <div class$="[[_computeProgressClass(3, progressIndex)]]"></div>
            <div class$="[[_computeProgressClass(4, progressIndex)]]"></div>
            <div class$="[[_computeProgressClass(5, progressIndex)]]"></div>
        </div>
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
            progress: {
                type: Array,
                value: () => [0, 0, 0, 0, 0]
            },
            progressIndex: {
                type: Number,
                value: 0
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
        window.addEventListener('keydown', this.generateSequence);
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
            this.progressIndex++;
            this.checkGame();
        } else {
            console.log('wrong');
            e.currentTarget.style.borderColor = 'red';
            setTimeout(() => element.style.borderColor = '#eee', 500);
            this.resetGame();
        }
    }
    checkGame() {
        if (this.userSequence.length === this.botSequence.length) {
            console.log('win');
        }
    }
    resetGame() {
        this.set('botSequence', []);
        this.set('userSequence', []);
        this.progressIndex = 0;
    }
    generateSequence(e) {
        let botSequenceCandidate;
        do {
            botSequenceCandidate = this.doGenerateSequence(e);
        } while(!this.arraysDiffer(botSequenceCandidate, this.botSequence));
        this.set('botSequence', botSequenceCandidate);
        this.playBotSequence();
    }
    doGenerateSequence(e) {
        if (e.key && e.key !== 'r') {
            return;
        }
        let sequence = [];
        this.set('userSequence', []);
        // Number of notes [2..5]
        let numberOfNotes = Math.floor(Math.random() * 4) + 2;
        // dev
        numberOfNotes = 2;
        const timings = [];
        for (let i = 0; i < numberOfNotes; i++) {
            do {
                // Randomly choose note index [0..4] and set length to normal crotchet
                sequence[i] = { noteIndex: Math.floor(Math.random() * 4 + 1), length: 4 };
            // Repeat until no consecutive notes are the same
            } while (sequence[i].noteIndex === sequence[i - 1] &&sequence[i - 1].noteIndex);
        }
        // Going through the crotchet values and replace some with quavers

        // ForEach while adding new items to the array
        sequence.forEach((item, index) => {
            // 65% times don't transform to quavers 
            if (Math.random() <= 0.65) {
                return;
            }
            sequence[index].length = 2;
            this.splice('botSequence', index, 0, { noteIndex: Math.floor(Math.random() * 4 + 1), length: 2 });
        });
        console.log('botSequence', JSON.stringify(sequence));
        return sequence;
    }
    arraysDiffer(arr1, arr2) {
        return arr1.length !== arr2.length || arr1.filter((item, index) => item !== arr2[index]).length > 0;
    }
    playBotSequence() {
        let currentTime = 0;
        for (let k = 0; k < this.botSequence.length; k++) {
            this.playSound(this.botSequence[k].noteIndex, currentTime);
            // Add note length to the currentTime 
            currentTime += this.botSequence[k].length * 0.25;
        }
    }
    _computeProgressClass(itemIndex, progressIndex) {
        if (itemIndex <= progressIndex) {
            return 'progress-section flex done';
        } else {
            return 'progress-section flex';
        }
    }
}
customElements.define(PieApp.is, PieApp);
