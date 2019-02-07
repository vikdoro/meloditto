import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-dialog/paper-dialog.js';
import './pie-icons.js';
import './play-button.js';
import { PiePlayerMixin } from './pie-player-mixin.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class PieGame extends PiePlayerMixin(GestureEventListeners(PolymerElement)) {
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
                max-width: 420px;
                height: 120vw;
                max-height: 504px;
                background: #22272d;
            }
            .cell-container {
                padding: 18px 18px 12px;
            }
            #top-section {
                width: 100%;
                opacity: 1;
                color: #f5f5f5;
            }
            #quit-game-trigger {
                box-sizing: border-box;
                padding: 16px 12px 16px 16px;
            }
            iron-icon {
                --iron-icon-width: 20px;
                --iron-icon-height: 20px;
            }
            #point-counter {
                font-size: 18px;
                padding: 16px 0 16px 12px;
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
                top: 10px;
                left: 10px;
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
            :host([reset]) .progress-section {
                background: #c62828;
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
            #note-4 {
                width: 40px;
                height: 40px;
                background: #F3DFA2;
                border-radius: 50%;
            }
            #note-3 {
                width: 40px;
                height: 40px;
                background: #7e57c2;
                transform: rotate(45deg) scale(0.92);
            }
            #note-2 {
                width: 0;
                height: 0;
                border-left: 24px solid transparent;
                border-right: 24px solid transparent;
                border-bottom: 44px solid #EFE6DD;
            }
            #note-1 {
                width: 0;
                height: 0;
                border-left: 26px solid transparent;
                border-right: 26px solid transparent;
                border-bottom: 41px solid #7EBDC2;
                transform: rotate(45deg);
            }
            #note-0 {
                width: 40px;
                height: 40px;
                background: #5c6bc0;
            }
            .concealed {
                background: transparent;
            }
            #play-button-container {
                position: relative;
                width: 80px;
                height: 80px;
            }
            #play-button-container svg {
                position: absolute;
                top: 0;
                left: 0;
            }
            #play-button-container svg {
                width: 80px;
                height: 80px;
                transform: rotate(-90deg);
            }
            #play-button-container svg circle {
                fill: none;
                stroke: #efe6dd;
                stroke-width: 4;
                transform: translateZ(0);
            }
            #tooltip {
                margin: 0;
                border-radius: 5px;
                animation: tooltipFloat 360ms ease-in-out infinite alternate forwards;
            }
            #tooltip-content {
                position: relative;
                padding: 18px 24px;
                margin: 0;
                border-radius: 3px;
            }
            #tooltip-content #tooltip-text {
            }
            #tooltip-content #tooltip-arrow {
                position: absolute;
                bottom: -10px;
                left: calc(50% - 9px);
                height: 0;
                width: 0;
                border-top: 10px solid white;
                border-left: 9px solid transparent;
                border-right: 9px solid transparent;

            }
            @keyframes tooltipFloat {
                from { transform: translateY(0); }
                to { transform: translateY(-6px); }
            }
            [hidden] {
                display: none !important;
            }
        </style>
        <div id="container" class="vertical layout center">
            <div id="top-section" class="horizontal layout justified">
                <div id="point-counter" class="flex">[[score]]</div>
                <div id="quit-game-trigger" on-down="quitGame">
                    <iron-icon icon="pie-icons:menu"></iron-icon>
                </div>
            </div>
            <div class="wrapper layout vertical">
                <div class="cell-container flex layout vertical">

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             data-note="4"
                             on-down="hit">
                            <div id="note-4"></div>
                        </div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             style="position: relative; top: -18px; left: 0;"
                             data-note="3"
                             on-down="hit">
                            <div id="note-3"></div>
                        </div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             style="position: relative; top: 4px; left: -1px;"
                             data-note="2"
                             on-down="hit"
                             hidden$="[[_isSmallerButNotZero(revealIndex, 4)]]">
                            <div id="note-2"></div>
                        </div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             data-note="1"
                             on-down="hit"
                             hidden$="[[_isSmallerButNotZero(revealIndex, 5)]]">
                            <div id="note-1"></div>
                        </div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             data-note="0"
                             on-down="hit"
                             hidden$="[[_isSmallerButNotZero(revealIndex, 3)]]">
                            <div id="note-0"></div>
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
                                cx="40"
                                cy="40"
                                r="36"
                                stroke-dasharray="252"
                                stroke-dashoffset="252"
                                on-transitionend="onPlayButtonAnimationEnd"/>
                    </svg>
                    <play-button on-down="togglePlayback" playback="[[playback]]"></play-button>
                </div>
            </div>
        </div>
        <paper-dialog id="tooltip" vertical-align="top" horizontal-align="center" vertical-offset="-72">
            <div id="tooltip-content">
                <div id="tooltip-text">Yo soy tooltip</div>
                <div id="tooltip-arrow"></div>
            </div>
        </paper-dialog>
        `;
    }

    static get is() { return 'pie-game'; }
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
            warmupIndex: {
                type: Number,
                value: 0
            },
            hasStartedGame: {
                type: Boolean,
                value: false
            },
            gameLevel: {
                type: Number,
                value: 0
            },
            revealIndex: {
                computed: 'computeRevealIndex(gameLevel, warmupIndex)'
            }
        }
    }
    constructor() {
        super();
        this.generateSequence = this.generateSequence.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        //this.startTutorial();
    }
    startTutorial() {
        this.openTooltip(this.$['play-button-container']);
    }
    hit(e) {
        e.stopPropagation();

        // No action if playback is ongoing, except if it's the last note
        if (this.playback && !this.lastBotNote) {
            return;
        }
        
        // If it's the last note, turn off the playback to avoid the source
        // being disconnected later
        if (this.lastBotNote) {
            this.playback = false;
            this.lastBotNote = false;
        }

        const element = e.currentTarget;
        const note = parseInt(element.getAttribute('data-note'));

        // Stop showing red on the notebars
        this.reset = false
        this.playSound(note);
        element.classList.add('hit');
        setTimeout(() => {
            element.classList.remove('hit');
        }, 250);

        if (!this.botSequence || this.botSequence.length === 0) {
            return;
        }
        const currentNoteIndex = this.userSequence.length;

        // Right guess
        if (this.botSequence[currentNoteIndex].noteIndex === note) {
            this.push('userSequence', note);
            this.progressIndex = this.progressIndex + 1;
            this.checkGame();
            this.score = this.score + 10;
        // Wrong guess
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
            // Has won
            this.score = this.score + 20;

            // Warmup
            if (this.warmupIndex > 0) {
                // Finish warmup
                if (this.warmupIndex === 16) {
                    this.warmupIndex = 0;
                    // Increment warmup
                } else {
                    this.warmupIndex++;
                }
            }
            // Clear round and start new with delay
            setTimeout(() => {
                this.set('botSequence', []);
                this.progressIndex = -1;
            }, 850);
            setTimeout(() => {
                this.startPlaybackWithDelay();
            }, 850);
        }
    }
    computeRevealIndex (gameLevel, warmupIndex) {
        let response;
        if (this.warmupIndex) {
            if (0 <= this.warmupIndex && this.warmupIndex < 3) {
                response = 2; 
            } else if (3 <= this.warmupIndex && this.warmupIndex < 8) {
                reponse = 3;
            } else if (8 <= this.warmupIndex && this.warmupIndex < 14) {
                response = 4;
            } else if (14 <= this.warmupIndex) {
                response = 5;
            }
        } else if (this.gameLevel) {
            response = this.gameLevel;
        }
        return response;
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
        if (this.botSequence.length === 0) {
            this.playbackIndex = -1;
            this.generateSequence();
        }
        this.playBotSequence();
    }
    quitGame() {
        this.set('userSequence', []);
        this.progressIndex = -1;
        this.playbackIndex = -1;
        this.score = 0;
        this.generateSequence();
        this.dispatchEvent(
            new CustomEvent('quit-game-request', {
                bubbles: true,
                composed: true
            })
        );
    }
    openTooltip(target) {
        const tooltip = this.$.tooltip;
        const targetRect = target.getBoundingClientRect();
        tooltip.positionTarget = target;
        tooltip.open();
    }
    generateSequence() {
        let botSequenceCandidate;
        do {
            botSequenceCandidate = this.doGenerateSequence();
        } while(!this.arraysDiffer(botSequenceCandidate, this.botSequence));
        this.set('botSequence', botSequenceCandidate);
    }
    doGenerateSequence() {
        const pitchArray = this._getPitchArray();
        const numberOfNotes = this._getNumberOfNotes();
        const forcedWarmupSequence = (this.warmupIndex > 0 && this.warmupIndex < 5) ||
            this.warmupIndex === 8 || this.warmupIndex === 9 || this.warmupIndex === 14 || this.warmupIndex === 15;
        let sequence = [];
        do {
            for (let i = 0; i < numberOfNotes; i++) {
                // Randomly choose note index and set length to normal crotchet
                sequence[i] = { noteIndex: pitchArray[Math.floor(Math.random() * pitchArray.length)], length: 4 };
            }
            // Post warmup
            if (!forcedWarmupSequence) {
                // Going through the crotchet values and replace some with quavers
                let indexesToTransform = [];
                sequence.forEach((item, index) => {
                    // 65% times don't transform to quavers or only once if it's warmup
                    if (Math.random() <= 0.65 || (this.warmupIndex > 0 && indexesToTransform.length > 0 )) {
                        return;
                    }
                    indexesToTransform.push(index);
                });
                for (let j = 0; j < indexesToTransform.length; j++) {
                    // The stored index plus the iteration index to adjust for the previous inserted notes
                    let indexToTransform = indexesToTransform[j] + j;
                    sequence[indexToTransform].length = 2;
                    //adding quaver
                    sequence.splice(indexToTransform + 1, 0,
                        { noteIndex: pitchArray[Math.floor(Math.random() * pitchArray.length)], length: 2 });
                }
            // Forced warmup sequence
            } else {
                switch (this.warmupIndex) {
                    case 1:
                        sequence = [{ noteIndex: 3, length: 4 }, { noteIndex: 4, length: 4 }];
                        break;
                    case 2:
                        sequence = [{ noteIndex: 4, length: 4 }, { noteIndex: 3, length: 4 }];
                        break;
                    case 3:
                        sequence[sequence.length - 1] = { noteIndex: 0, length: 4 };
                        break;
                    case 4:
                        sequence[0] = { noteIndex: 0, length: 4 };
                        break;
                    case 8:
                        sequence[sequence.length - 1] = { noteIndex: 2, length: 4 };
                        break;
                    case 9:
                        sequence[0] = { noteIndex: 2, length: 4 };
                        break;
                    case 14:
                        sequence[sequence.length - 1] = { noteIndex: 1, length: 4 };
                        break;
                    case 15:
                        sequence[0] = { noteIndex: 1, length: 4 };
                        break;
                }
            }
            // Repeat until melody has at least two different notes
        } while (sequence.filter(item => sequence[0].noteIndex !== item.noteIndex).length === 0);
        return sequence;
    }
    /*  Warm up starting at 2 pitches + 2 notes
        and ending at 5 pitches + 3 notes
        Steps:
        1: 2 pitches, 2 notes (this should be hardcoded)
        2: 2, 2 (this should be hardcoded)
        3: 3, 2 (last note hardcoded to new)
        4: 3, 3 (first note hardcoded to new)
        5: 3, 3
        6: 3, 3
        7: 3, 3
        8: 4, 2 (last note hardcoded to new)
        9: 4, 3 (first note hardcoded to new)
        10: 4, 3
        11: 4, 3
        12: 4, 3
        13: 4, 3
        14: 5, 2 (l)
        15: 5, 3 (f)
        16: 5, 3
    **/
    _getNumberOfNotes() {
        let response;
        let index = this.warmupIndex;
        if (index) {
            if ((1 <= index && index < 3) || (index === 8 || index === 14)) {
                response = 2;
            } else {
                response = 3;
            }
        } else {
            response = Math.floor(Math.random() * 3) + 2;
        }
        return response;
    }
    _getPitchArray() {
        const levelMap = {
            3: [3, 4, 0],
            4: [3, 4, 0, 2],
            5: [3, 4, 0, 2, 1]
        };
        if (this.gameLevel) {
            return levelMap[this.gameLevel];
        }
        let response;
        let index = this.warmupIndex;
        if (index) {
            if (1 <= index && index < 3) {
                response = [3, 4];
            } else if (3 <= index && index < 8) {
                response = [3, 4, 0];
            } else if (8 <= index && index < 14) {
                response = [3, 4, 0, 2];
            } else {
                response = [3, 4, 0, 2, 1];
            }
        } else {
            response = [3, 4, 0, 2, 1];;
        }
        return response;
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
    restartGame(gameLevel, warmupLevel) {
        this.set('botSequence', []);
        this.set('userSequence', []);
        this.progressIndex = -1;
        this.playbackIndex = -1;
        this.score = 0;
        this.warmupIndex = warmupLevel;
        this.gameLevel = gameLevel;
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
        this.togglePlayback();
    }
    _isSmallerButNotZero(compared, base) {
        return compared !== 0 && compared < base;
    }
}
customElements.define(PieGame.is, PieGame);
