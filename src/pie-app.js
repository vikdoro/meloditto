import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import './pie-icons.js';
import './play-button.js';
import { PiePlayerMixin } from './pie-player-mixin.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class PieApp extends PiePlayerMixin(GestureEventListeners(PolymerElement)) {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment iron-flex-factors">
            :host {
                display: block;
                max-width: 648px;
                max-height: 100vh;
                background: #202124;
                margin: 0 auto;
                --cell-size: 88px;
            }
            .colors {
                background: #89A7A7;
                background: #A23B72;
            }
            #container {
                height: 100%;
                box-sizing: border-box;
            }
            .wrapper {
                position: relative;
                opacity: 1;
                width: 100vw;
                max-width: 400px;
                height: 120vw;
                max-height: 480px;
                background: #22272d;
            }
            .cell-container {
                padding: 18px 18px 12px;
            }
            .top-section {
                width: 100%;
                opacity: 1;
                color: white;
                box-sizing: border-box;
                padding: 16px 8px;
            }
            iron-icon {
                --iron-icon-width: 21px;
                --iron-icon-height: 21px;
            }
            #point-counter {
                font-size: 18px;
            }
            #note-bars {
                width: 100%;
                height: 12px;
                opacity: 1;
                background: #22272d;
                box-sizing: border-box;
                padding: 0 1px;
                margin: 6px 0;
            }
            .progress-section {
                background: slategray;
                border-radius: 24px;
                margin-left: 2px;
            }
            .progress-section:first-child {
                margin-left: 0;
            }
            play-button {
                width: 60px;
                height: 60px;
                opacity: 1;
                position: absolute;
                top: 6px;
                left: 6px;
                transform: translateZ(0);
            }
            .right {
                background: green;
            }
            .cell {
                height: 100%;
                width: 50px;
                flex: 1 1 auto;
                transform: scale(0.9);
                border: 1px solid white;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }           
            .key {
                background: transparent;
                opacity: 1;
            }
            .key.hit {
                transform: scale(1);
            }
            .correct {
                background: green;
            }
            .sector:hover {
                background: #009;
            }
            .row {
                flex: 1;
            }
            .color .note {
                width: 33px;
                height: 33px;
                background: #EFE6DD;
                position: relative;
                top: 0;
                right: 0px;
                transform: scale(0.8);
            }
            #note-7b {
                top: -24px;
                right: -12px;
            }
            #note-7 {
                width: 34px;
                height: 34px;
                background: #5c6bc0;
                border-radius: 50%;
            }
            #note-6 {
                width: 40px;
                height: 40px;
                background: #F3DFA2;
                border-radius: 50%;
            }
            #note-5 {
                width: 40px;
                height: 40px;
                background: #7e57c2;
                transform: rotate(45deg) scale(0.92);
            }
            #note-5b {
                top: 12px;
                right: -12px;
            }
            :host([reset]) .progress-section {
                background: #c62828;
            }
            #note-2 {
                width: 0;
                height: 0;
                border-left: 28px solid transparent;
                border-right: 28px solid transparent;
                border-bottom: 32px solid #7EBDC2;
                transform: rotate(45deg);
            }
            #note-3 {
                width: 0;
                height: 0;
                border-left: 24px solid transparent;
                border-right: 24px solid transparent;
                border-bottom: 44px solid #EFE6DD;
            }
            #note-3b {
                background: #5c6bc0;
                background: #56A0D8;
                background: #7CC6FE;
            }
            #note-4 {
                width: 34px;
                height: 34px;
                background: #F3DFA2;
                background: #5c6bc0;
                border-radius: 50%;
            }
            #note-2b {
                right: -12px;
            }
            #note-1 {
                width: 40px;
                height: 40px;
                background: #5c6bc0;
            }
            .concealed {
                background: transparent;
            }
            #play-button-container {
                position: relative;
                width: 72px;
                height: 72px;
            }
            #play-button-container svg {
                position: absolute;
                top: 0px;
                left: 0px;
            }
            #play-button-container svg {
                width: 72px;
                height: 72px;
            }
            #play-button-container svg circle {
                fill: none;
                stroke: #efe6dd;
                stroke-width: 4;
                transform: translateZ(0);
            }
            [hidden] {
                display: none !important;
            }
        </style>
        <div id="container" class="vertical layout center">
            <div class="top-section horizontal layout justified">
                <div id="point-counter">[[score]]</div>
                <div id="quit-game-trigger" hidden$="[[!score]]" on-down="resetGame">
                    <iron-icon icon="pie-icons:close"></iron-icon>
                </div>
            </div>
            <div class="wrapper layout vertical">
                <div class="cell-container flex layout vertical">

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell">
                            <div id="note-6"></div>
                        </div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell">
                            <div id="note-5"></div>
                        </div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell">
                            <div id="note-3"></div>
                        </div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell">
                            <div id="note-2"></div>
                        </div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell" data-note="0" on-down="hit">
                            <div id="note-1"></div>
                        </div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>
                </div>

                <div id="note-bars" class="horizontal layout">
                    <template is="dom-repeat" items="[[botSequence]]">
                        <div class$="[[_computeProgressClass(item, index, progressIndex, playbackIndex)]]"></div>
                    </template>
                </div>
            </div>
            <div id="bottom-section" class="flex vertical layout center-center">
                <div id="play-button-container" class="l-relative layout vertical center-center">
                    <svg>
                        <circle id="shape"
                                cx="36"
                                cy="36"
                                r="36"
                                stroke-dasharray="252"
                                stroke-dashoffset="252"
                                on-transitionend="onPlayButtonAnimationEnd"/>
                    </svg>
                    <play-button on-down="togglePlayback" playback="[[playback]]"></play-button>
                </div>
            </div>
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
            progressIndex: {
                type: Number,
                value: -1
            },
            playbackIndex: {
                type: Number,
                value: -1
            },
            reset: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            score: {
                type: Number,
                value: 0
            },
            hasWon: Boolean
        }
    }
    constructor() {
        super();
        this.generateSequence = this.generateSequence.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        const elements = [...this.shadowRoot.querySelectorAll('.cell')];
        elements.forEach(element => {
            element.addEventListener('click', e => {
                e.currentTarget.classList.toggle('invisible');
            });
        });
    }
    hit(e) {
        e.stopPropagation();
        if (this.playback) {
            return;
        }
        const element = e.currentTarget;
        let note = element.getAttribute('data-note');
        if (!note) {
            return;
        }
        note = parseInt(note);
        this.playSound(note);
        element.classList.add('hit');
        setTimeout(() => {
            element.classList.remove('hit');
        }, 250);
        if (!this.botSequence || this.botSequence.length === 0) {
            return;
        }
        const currentNoteIndex = this.userSequence.length;
        if (this.botSequence[currentNoteIndex].noteIndex === note) {
            this.push('userSequence', note);
            this.progressIndex = this.progressIndex + 1;
            this.checkGame();
            this.score = this.score + 10;
        } else {
            this.reset = true;
            setTimeout(() => this.reset = false, 1200);
            this.set('userSequence', []);
            this.progressIndex = -1;
            this.score = this.score - 10;
        }
    }
    checkGame() {
        if (this.userSequence.length === this.botSequence.length) {
            this.hasWon = true;
            this.score = this.score + 20;
            setTimeout(() => {
                // Only if hasWon is still true, i.e. playback was not triggered manually
                if (this.hasWon) {
                    this.set('botSequence', []);
                    this.progressIndex = -1;
                }
            }, 1000);
            setTimeout(() => {
                // Only if hasWon is still true, i.e. playback was not triggered manually
                if (this.hasWon) {
                    this.startPlaybackWithDelay();
                }
            }, 1000);
        }
    }
    startPlaybackWithDelay() {
        this.shadowRoot.querySelector('#play-button-container svg circle').style.transition = 'stroke-dashoffset 1500ms cubic-bezier(0.2, 0.2, 0.7, 0.8)';
        this.shadowRoot.querySelector('#play-button-container svg circle').setAttribute('stroke-dashoffset', 0);
    }
    togglePlayback() {
        this.playback = !this.playback;
        // Playback button hit straight after winning
        this.resetPlaybackButtonStrokeOffset();
        if (!this.playback) {
            return;
        }
        this.set('userSequence', []);
        this.progressIndex = -1;
        if (this.botSequence.length === 0 || this.hasWon) {
            this.playbackIndex = -1;
            this.generateSequence();
            this.hasWon = false;
        }
        if (!window.context) {
            this.init();
            return;
        }
        this.playBotSequence();
    }
    init() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            window.context = new AudioContext();
            window.bufferLoader = new BufferLoader(
                window.context,
                [
                    'assets/sounds/piano-c.m4a',
                    'assets/sounds/piano-d.m4a',
                    'assets/sounds/piano-e.m4a',
                    'assets/sounds/piano-g.m4a',
                    'assets/sounds/piano-a.m4a',
                ],
                () => {
                    this.playBotSequence();
                }
            );
            window.bufferLoader.load();
        }
        catch (e) {
            alert('Web Audio API is not supported in this browser');
        }
    }
    resetGame() {
        this.set('userSequence', []);
        this.progressIndex = -1;
        this.playbackIndex = -1;
        this.hasWon = false;
        this.score = 0;
        this.generateSequence();
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
                sequence[i] = { noteIndex: Math.floor(Math.random() * 5), length: 4 };
            // Repeat until no consecutive notes are the same
            } while (sequence[i].noteIndex === sequence[i - 1] &&sequence[i - 1].noteIndex);
        }
        // Going through the crotchet values and replace some with quavers
        let indexesToTransform = [];
        sequence.forEach((item, index) => {
            // 65% times don't transform to quavers 
            if (Math.random() <= 0.65) {
                return;
            }
            indexesToTransform.push(index);
        });
        for (let j = 0; j < indexesToTransform.length; j++) {
            let indexToTransform = indexesToTransform[j];
            sequence[indexToTransform].length = 2;
            //adding quaver
            sequence.splice(indexToTransform + 1, 0, { noteIndex: Math.floor(Math.random() * 5), length: 2 });
        }
        return sequence;
    }
    arraysDiffer(arr1, arr2) {
        return arr1.length !== arr2.length || arr1.filter((item, index) => item !== arr2[index]).length > 0;
    }
    playBotSequence() {
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
        setTimeout(this.startPlayback.bind(this), 0);
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
        if (itemIndex <= progressIndex) {
            classString += ' correct';
        }
        return classString;
    }
    resetPlaybackButtonStrokeOffset() {
        this.shadowRoot.querySelector('#play-button-container svg circle').style.transition = 'none';
        this.shadowRoot.querySelector('#play-button-container svg circle').setAttribute('stroke-dashoffset', 252);
    }
    onPlayButtonAnimationEnd() {
        this.hasWon = false;
        this.togglePlayback();
    }
}
customElements.define(PieApp.is, PieApp);
