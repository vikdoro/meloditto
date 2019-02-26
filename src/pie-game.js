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
                overflow: hidden;
                background: #1B1F23;
                margin: 0 auto;
                --cell-size: 88px;
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
                height: 125vw;
                max-height: 525px;
                background: #13171B;
            }
            .cell-container {
                padding: 16px;
            }
            #top-section {
                width: 100%;
                opacity: 1;
                color: #9fa4a8;
            }
            .top-section-content {
                padding-left: 16px;
            }
            #quit-game-trigger {
                box-sizing: border-box;
                padding: 16px;
            }
            iron-icon {
                --iron-icon-width: 20px;
                --iron-icon-height: 20px;
            }
            #game-point-display, #warmup-level-display {
                min-width: 40px;
                font-size: 18px;
                margin-left: 8px;
            }
            #warmup-level-display {
                letter-spacing: 2px;
            }
            #note-bars {
                width: 100%;
                height: 12px;
                opacity: 1;
                background: #13171b;
                box-sizing: border-box;
                padding: 0 1px;
                margin: 4px 0;
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
                background: #2e7d32;
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
            #dialog-content {
                padding: 32px 40px;
                background: #1B1F23;
                margin: 0;
                color: #bdbdbd;
                text-align: center;
                font-size: 16px;
            }
            #dialog-content .tooltip-text {
                line-height: 24px;
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
            button {
                display: block;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1.2px;
                background: #1B1F23;
                color: #B9BEC2;
                padding: 12px 18px;
                margin: 16px auto 0;
                border: 1px solid rgba(255,255,255,0.5);
                border-radius: 5px;
            }
            .life-icon {
                fill: #9fa4a8;
                --iron-icon-width: 18px;
                --iron-icon-height: 18px;
                margin-right: 2px;
            }
            #life-container {
                position: relative;
                top: 0;
                left: 0;
                width: 18px;
                height: 18px;
            }
            #life-overlay, #life-container > iron-icon {
                position: absolute;
                bottom: 0;
                left: 0;
            }
            #life-overlay {
                width: 100%;
                height: 100%;
                background: #1B1F23;
                z-index: 10;
                opacity: 0;
            }
            .disable-pointer {
                pointer-events: none;
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
            <div id="top-section" class="horizontal layout end-justified">
                 <!-- Game display --> 
                <div class="top-section-content flex horizontal layout center" hidden$="[[!gameMode]]">
                    <div id="life-count-container" class="horizontal layout">
                        <div id="life-container">
                            <iron-icon class="life-icon" icon="pie-icons:life" hidden$="[[_isSmaller(lifeCount, 1)]]"></iron-icon>
                            <div id="life-overlay" style$="[[_computeLifeOverlayHeight(lifeCount)]]"></div>
                        </div>
                    </div>
                    <div id="game-point-display">[[score]]</div>
                </div>
                <!-- Warmup display --> 
                <div class="top-section-content flex horizontal layout center" hidden$="[[gameMode]]">
                    <div id="warmup-level-display">[[warmupDisplayLevel]]/5</div>
                </div>
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
                            <div id="note-4" class="note"></div>
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
                            <div id="note-3" class="note"></div>
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
                             hidden$="[[_isSmaller(revealIndex, 4)]]">
                            <div id="note-2" class="note"></div>
                        </div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             data-note="1"
                             on-down="hit"
                             hidden$="[[_isSmaller(revealIndex, 5)]]">
                            <div id="note-1" class="note"></div>
                        </div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             data-note="0"
                             on-down="hit"
                             hidden$="[[_isSmaller(revealIndex, 3)]]">
                            <div id="note-0" class="note"></div>
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
        <paper-dialog id="tooltip"
                      vertical-align="top"
                      horizontal-align="center"
                      vertical-offset="-72"
                      no-cancel-on-outside-click
                      no-cancel-on-esc-key>
            <div id="tooltip-content">
                <div id="tooltip-text">[[tutorialText]]</div>
                <div id="tooltip-arrow"></div>
            </div>
        </paper-dialog>
        <paper-dialog id="dialog" on-iron-overlay-closed="_clearGame" with-backdrop>
            <div id="dialog-content">
                <div class="tooltip-text">Game over!</div>
                <div class="tooltip-text">Score: [[score]]</div>
                <button type="button"
                        on-down="_restartGameFromDialog">Play again</button>
            </div>
        </paper-dialog>
        <paper-dialog id="warmup-finished-dialog" on-iron-overlay-closed="_clearGame" with-backdrop>
            <div id="dialog-content">
                <div class="tooltip-text">Bravo!</div>
                <div class="tooltip-text">You have mastered all notes.</div>
                <button type="button"
                        on-down="_restartGameFromDialog"
                        data-redirect-to-game>Start a game</button>
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
            warmupLevel: {
                type: Number,
                value: 20
            },
            gameLevel: {
                type: Number,
                value: 0
            },
            revealIndex: {
                computed: 'computeRevealIndex(gameLevel, warmupLevel)'
            },
            premiumSound: {
                type: Boolean,
                value: false,
                observer: '_onPremiumSoundChanged'
            },
            lifeCount: {
                type: Number,
                value: 3
            },
            gameMode: {
                type: Boolean,
                computed: '_isGameMode(gameLevel)'
            },
            warmupDisplayLevel: {
                type: Number,
                computed: '_computeWarmupDisplayLevel(warmupLevel)'
            },
            tutorialLevel: {
                type: Number,
                value: 1
            },
            tutorialText: {
                type: String,
                value: 'Click here to play a melody!'
            }
        }
    }
    constructor() {
        super();
        this.generateSequence = this.generateSequence.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        this.startTutorial();
    }
    startTutorial() {
        this.openTooltip(this.$['play-button-container']);
    }
    _onPremiumSoundChanged(premium) {
        if (premium) {
            this.sampleList = ([
                'assets/sounds/ppiano-1.wav',
                'assets/sounds/ppiano-2.wav',
                'assets/sounds/ppiano-3.wav',
                'assets/sounds/ppiano-4.wav',
                'assets/sounds/ppiano-5.wav',
            ]);
        } else {
            this.sampleList = ([
                'assets/sounds/piano-1.wav',
                'assets/sounds/piano-2.wav',
                'assets/sounds/piano-3.wav',
                'assets/sounds/piano-4.wav',
                'assets/sounds/piano-5.wav',
            ]);
        }
        // Load the samples only if the audiocontext is ready and not before any user gesture
        if (window.context && window.context.state === 'running') {
            this.init();
        }
            
    }
    hit(e) {
        e.stopPropagation();
        const noteIndex = parseInt(e.currentTarget.getAttribute('data-note'));

        // No action if playback is ongoing, except if it's the last note
        if (this.playback && !this.lastBotNote) {
            return;
        }

        if (this.tutorialLevel > 0) {
            this.proceedToNextTutorialStep();
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
        
        element.classList.add('hit');
        setTimeout(() => {
            element.classList.remove('hit');
        }, 250);

        this.playSound(note);
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
            if (this.gameMode) {
                this.lifeCount -= 1;
                if (this.lifeCount === 0) {
                    console.log('game over');
                    setTimeout(() => this.$.dialog.open(), 1000);
                }
            }
        }
    }
    /*
    UI helper to compute the height of the overlay covering the heart symbol 
    **/
    _computeLifeOverlayHeight() {
        let response;
        if (this.lifeCount === 3) {
            response = 'opacity: 0;';
        } else if (this.lifeCount === 2) {
            response = 'opacity: 0.33;';
        } else {
            response = 'opacity: 0.66;';
        }
        return response;
    }
    checkGame(force) {
        if (force || this.userSequence.length === this.botSequence.length) {
            // Has won
            this.score = this.score + 20;
            this.lifeCount = 3;
            // Finished warmup, exit gameflow
            if (this.warmupLevel === 20) {
                this.$['warmup-finished-dialog'].open();
                return;
            }

            // Warmup
            if (this.warmupLevel > 0) {
                // Finish warmup
                if (this.warmupLevel === 16) {
                    this.warmupLevel = 0;
                    // Increment warmup
                } else {
                    this.warmupLevel++;
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
    computeRevealIndex (gameLevel, warmupLevel) {
        let response;
        if (this.warmupLevel) {
            if (0 <= this.warmupLevel && this.warmupLevel < 3) {
                response = 2; 
            } else if (3 <= this.warmupLevel && this.warmupLevel < 8) {
                response = 3;
            } else if (8 <= this.warmupLevel && this.warmupLevel < 14) {
                response = 4;
            } else if (14 <= this.warmupLevel) {
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

        if (this.tutorialLevel > 0) {
            this.proceedToNextTutorialStep();
        }
        
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
        this.resetPlaybackButtonStrokeOffset();
        this.dispatchEvent(
            new CustomEvent('quit-game-request', {
                bubbles: true,
                composed: true
            })
        );
    }
    openTooltip(target) {
        const tooltip = this.$.tooltip;
        if (target) {
            const targetRect = target.getBoundingClientRect();
            tooltip.positionTarget = target;
        }
        tooltip.open();
        tooltip.notifyResize();
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
        const warmupLevel = this.warmupLevel;
        const forcedWarmupSequence = (warmupLevel > 0 && warmupLevel < 5) ||
            warmupLevel === 8 || warmupLevel === 9 || (warmupLevel >= 14 && warmupLevel < 21);
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
                    if (Math.random() <= 0.65 || (warmupLevel > 0 && indexesToTransform.length > 0 )) {
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
                switch (warmupLevel) {
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
        let index = this.warmupLevel;
        if (index) {
            if ((1 <= index && index < 3) || (index === 8 || index === 14)) {
                response = 2;
            } else {
                response = 3;
            }
        } else {
            response = Math.floor(Math.random() * 3) + 2;
        }
        return 2;
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
        let warmupLevel = this.warmupLevel;
        if (warmupLevel) {
            if (1 <= warmupLevel && warmupLevel < 3) {
                response = [3, 4];
            } else if (3 <= warmupLevel && warmupLevel < 8) {
                response = [3, 4, 0];
            } else if (8 <= warmupLevel && warmupLevel < 14) {
                response = [3, 4, 0, 2];
            } else {
                response = [3, 4, 0, 2, 1];
            }
        } else {
            response = [3, 4, 0, 2, 1];;
        }
        return response;
    }
    proceedToNextTutorialStep() {
        this.tutorialLevel += 1;
        const noteElements = [...this.shadowRoot.querySelectorAll('.note')];
        switch (this.tutorialLevel) {
            case 1:
                this.tutorialText = 'Click here to play a melody!';
                break;
            case 2:
                this.$.tooltip.close();
                break;
            case 3:
                this.tutorialText = 'now this';
                noteElements.forEach(note => {
                    if (note.id !== 'note-0') {
                        note.parentElement.classList.add('disable-pointer');
                    }
                });
                this.openTooltip(this.$['note-0']);
                break;
            case 4:
            noteElements.forEach(note => {
                note.parentElement.classList.remove('disable-pointer');
            });
                this.$.tooltip.close();
                break;
            case 5:
                this.tutorialText = 'now this';
                this.openTooltip(this.$['note-0']);
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
    _restartGameFromDialog(e) {
        if (e.currentTarget.hasAttribute('data-redirect-to-game')) {
            this.gameLevel = 5;
            this.warmupLevel = 0;
            this.$['warmup-finished-dialog'].close();
        } else {
            this.$.dialog.close();
        }
        this.startGame(this.gameLevel, this.warmupLevel);
    }
    _clearGame() {
        this.set('botSequence', []);
        this.set('userSequence', []);
        this.progressIndex = -1;
        this.playbackIndex = -1;
        this.score = 0;
        this.lifeCount = 3;
    }
    // Public method
    startGame(gameLevel, warmupLevel) {
        this._clearGame();
        this.gameLevel = gameLevel || 0;
        this.warmupLevel = warmupLevel || 0;
        setTimeout(this.startPlaybackWithDelay.bind(this), 0);
    }
    _computeWarmupDisplayLevel(warmupLevel) {
        const pitchArray = this._getPitchArray();
        return pitchArray.length;
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
    _isSmaller(compared, base) {
        return compared < base;
    }
    _isGameMode(gameLevel) {
        return gameLevel > 0;
    }
}
customElements.define(PieGame.is, PieGame);
