import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-dialog/paper-dialog.js';
import './pie-icons.js';
import './play-button.js';
import { PiePlayerMixin } from './pie-player-mixin.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import Warmup from './warmup.js';

class PieGame extends PiePlayerMixin(GestureEventListeners(PolymerElement)) {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment iron-flex-factors">
            :host {
                display: block;
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

            #game-field {
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

            #exit-game-trigger {
                box-sizing: border-box;
                padding: 16px;
            }

            iron-icon {
                --iron-icon-width: 24px;
                --iron-icon-height: 24px;
            }

            #game-point-display, #warmup-level-display {
                min-width: 40px;
                font-size: 18px;
                margin-left: 8px;
            }

            #warmup-level-display {
                letter-spacing: 2px;
            }

            .warmup-icon {
                height: 14px;
                width: 14px;
                border-radius: 50%;
                background: #9fa4a8;
                margin-right: 4px;
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

            :host([wrong-note-feedback]) .progress-section {
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

            #tooltip-text {
                text-align: center;
            }

            .dialog-content {
                position: relative;
                text-align: center;
                font-size: 16px;
                background: #1B1F23;
                color: #9fa4a8;
                padding: 32px 48px;
                margin: 0;
            }

            .dialog-content .tooltip-text {
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
                opacity: 0.66;
            }

            @keyframes tooltipFloat {
                from { transform: translateY(0); }
                to { transform: translateY(-6px); }
            }

            [invisible] {
                visibility: hidden;
                opacity: 0;
            }

            [hidden] {
                display: none !important;
            }
        </style>
        <div id="container" class="vertical layout center">
            <!-- TOP SECTION -->
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
                <div class="top-section-content flex horizontal layout center" hidden$="[[!warmupMode]]">
                    <div class="warmup-icon" style$="[[_computeWarmupIconOpacity(warmupDisplayLevel, 1)]]"></div>
                    <div class="warmup-icon" style$="[[_computeWarmupIconOpacity(warmupDisplayLevel, 2)]]"></div>
                    <div class="warmup-icon" style$="[[_computeWarmupIconOpacity(warmupDisplayLevel, 3)]]"></div>
                    <div class="warmup-icon" style$="[[_computeWarmupIconOpacity(warmupDisplayLevel, 4)]]"></div>
                    <div class="warmup-icon" style$="[[_computeWarmupIconOpacity(warmupDisplayLevel, 5)]]"></div>
                </div>
                <div id="exit-game-trigger" on-down="exitGame">
                    <iron-icon icon="pie-icons:menu"></iron-icon>
                </div>
            </div>
            <!-- GAME FIELD --> 
            <div id="game-field" class="layout vertical">
                <div class="cell-container flex layout vertical">

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell key layout vertical center-center"
                             data-note="4"
                             on-down="playNote">
                            <div id="note-4" class="note"></div>
                        </div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div id="note-3-container"
                             class="cell key layout vertical center-center"
                             style="position: relative; top: -18px; left: 0;"
                             data-note="3"
                             on-down="playNote">
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
                             on-down="playNote"
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
                             on-down="playNote"
                             hidden$="[[_isSmaller(revealIndex, 5)]]">
                            <div id="note-1" class="note"></div>
                        </div>
                        <div class="cell"></div>
                    </div>

                    <div class="row horizontal layout">
                        <div class="cell"></div>
                        <div class="cell"></div>
                        <div id="note-0-container"
                             class="cell key layout vertical center-center"
                             data-note="0"
                             on-down="playNote"
                             hidden$="[[_isSmaller(revealIndex, 3)]]">
                            <div id="note-0" class="note"></div>
                        </div>
                        <div class="cell"></div>
                        <div class="cell"></div>
                    </div>
                </div>

                <div id="note-bars" class="horizontal layout" invisible$="[[evaluationSuspended]]">
                    <template is="dom-repeat" items="[[botSequence]]">
                        <div class$="[[_computeProgressClass(item, index, userProgress, playbackIndex)]]"></div>
                    </template>
                </div>
            </div>
            <!-- BOTTOM SECTION -->
            <div id="bottom-section" class="flex vertical layout center-center">
                <div id="play-button-container" class="l-relative layout vertical center-center">
                    <svg>
                        <circle id="shape"
                                cx="40"
                                cy="40"
                                r="36"
                                stroke-dasharray="252"
                                stroke-dashoffset="252"
                                on-transitionend="togglePlayback"/>
                    </svg>
                    <play-button id="play-button" on-down="togglePlayback" playback="[[playback]]"></play-button>
                </div>
            </div>
        </div>
        <paper-dialog id="tooltip"
                      vertical-align="top"
                      horizontal-align="center"
                      vertical-offset="-84"
                      no-cancel-on-outside-click
                      no-cancel-on-esc-key>
            <div id="tooltip-content">
                <div id="tooltip-text"></div>
                <div id="tooltip-arrow"></div>
            </div>
        </paper-dialog>
        <paper-dialog id="game-over-dialog" on-iron-overlay-closed="_clearGame" with-backdrop>
            <div class="dialog-content">
                <div class="tooltip-text">Game over!</div>
                <div class="tooltip-text">Score: [[score]]</div>
                <button type="button"
                        on-down="_restartGameFromDialog">Play again</button>
            </div>
        </paper-dialog>
        <paper-dialog id="warmup-finished-dialog"
                      on-iron-overlay-closed="_clearGame"
                      modal>
            <div class="dialog-content">
                <div class="tooltip-text">Bravo!</div>
                <div class="tooltip-text">You have mastered all notes.</div>
                <button type="button"
                        on-down="_startGameFromDialog">Start a game</button>
            </div>
        </paper-dialog>
        `;
    }

    static get is() { return 'pie-game'; }
    static get properties() {
        return {
            /**
             * The melody the bot will play.
             */
            botSequence: {
                type: Array,
                value: () => []
            },
            /**
             * The index of the last rightly-guessed note.
             */
            userProgress: {
                type: Number,
                value: -1
            },
            /**
             * The index of the last note played by the bot.
             */
            playbackIndex: {
                type: Number,
                value: -1
            },
            /**
             * If the visual feedback of a wrong guess ought to show.
             */
            wrongNoteFeedback: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            /**
             * The game mode score.
             */
            score: {
                type: Number,
                value: 0
            },
            /**
            * The wamup mode user level.
            */
            warmupLevel: {
                type: Number,
                value: 0
            },
            /**
            * Which warmup level to display to the user.
            */
            warmupDisplayLevel: {
                type: Number,
                computed: '_computeWarmupDisplayLevel(warmupLevel, warmup)'
            },
            /**
            * The game mode user level.
            * This will determine how many notes (3, 4 or 5) are used in the scale.
            */
            gameLevel: {
                type: Number,
                value: 5
            },
            /**
            * This controls what notes are shown.
            */
            revealIndex: {
                computed: '_computeRevealIndex(gameLevel, warmupLevel)'
            },
            /**
            * The game mode user lives.
            */
            lifeCount: {
                type: Number,
                value: 4
            },
            /**
            * If we are in game mode.
            */
            gameMode: {
                type: Boolean,
                computed: '_computeGameMode(gameLevel)'
            },
            /**
            * If we are in warmup mode.
            */
            warmupMode: {
                type: Boolean,
                computed: '_computeWarmupMode(warmupLevel)'
            },
            /**
            * The list of the sound files.
            */
            sampleList: {
                type: Array,
                value: [
                    'assets/sounds/piano-1.mp3',
                    'assets/sounds/piano-2.mp3',
                    'assets/sounds/piano-3.mp3',
                    'assets/sounds/piano-4.mp3',
                    'assets/sounds/piano-5.mp3',
                ]
            },
            /**
            * If the user should be able to play freely
            * without evaluating the notes.
            */
            evaluationSuspended: {
                type: Boolean,
                value: false
            },
            /**
            * If some actions should be temporarily disabled in the game flow.
            * (e.g. when the playback button is animating or when it's game over).
            */
            blockAction: {
                ype: Boolean,
                value: false
            },
            /**
            * The instance of the Warmup class to coordinate the warmup.
            */
            warmup: {
                type: Object,
                value: () => ({})
            },
            /**
            * The instance of the Tutorial class to coordinate the tutorial.
            */
            tutorial: {
                type: Object,
                value: () => ({})
            },
            timeout: {
                type: Number,
                value: null
            },
            feedbackTimeout: {
                type: Number,
                value: null
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.warmup = new Warmup();
        this.addEventListener('tutorial-finished', () => {
            localStorage.setItem('tutorial-done', true);
            this.startFlow(5, 0);
        });
        this.dispatchEvent(
            new CustomEvent('pie-game-connected', {
                bubbles: true,
                composed: true
            })
        );
    }

    /**
     * On-down action for the displayed notes
     */
    playNote(e) {
        e.stopPropagation();

        // Return if tutorial is active and not targeting this element,
        // bot playback hasn't played the last note, or animation is ongoing
        if ((this.tutorial.active && !this.tutorial.isElementTarget(e)) || (this.playback && !this.lastBotNote) || this.blockAction) {
            return;
        }
        const element = e.currentTarget;
        const note = parseInt(element.getAttribute('data-note'));

        // Dispatch an event that for the tutorial module.
        e.currentTarget.dispatchEvent(new Event('tutorial-tap'));

        // If it's the last note, turn off the playback to avoid the source
        // being disconnected later
        if (this.lastBotNote) {
            this.playback = false;
            this.lastBotNote = false;
        }

        // Stop showing red on the notebars
        this.wrongNoteFeedback = false

        // Animate the active element 
        element.classList.add('hit');
        setTimeout(() => {
            element.classList.remove('hit');
        }, 250);

        this.playSound(note, true);

        // User has heard at least two notes, so if they are playing sounds, display the full melody
        // to allow evaluation
        if (this.userStoppedPlaybackAfterHearingMultipleNotes) {
            this.playbackIndex = this.botSequence.length - 1;
        }

        // Evalutate the played note if a bot melody is present,
        // flow not suspended, not in tutorial and 
        // melody has played through (playback index is not -1)
        if (this.botSequence.length > 0
                && !this.tutorial.active
                && !this.evaluationSuspended
                && this.playbackIndex !== -1) {
            this.evaluatePlayedNote(note);

            // Reset this flag as user guesses are evaluated now
            this.userStoppedPlaybackAfterHearingMultipleNotes = false;
        }
        
    }

    /**
     * Evaluate if the user note is correct
     */
    evaluatePlayedNote(note) {
        const currentNoteIndex = this.userProgress + 1;

        // Right guess
        if (this.botSequence[currentNoteIndex].noteIndex === note) {
            this.userProgress = this.userProgress + 1;
            if (this.userProgress === this.botSequence.length - 1) {
                this.progressAfterCorrectGuess();
            }
        // Wrong guess
        } else {
            // Cancel previous red feedback timeout
            if (this.feedbackTimeout) {
                clearTimeout(this.feedbackTimeout);
                this.feedbackTimeout = null;
                this.wrongNoteFeedback = false;

                // Show red again
                setTimeout(() => {
                    this.wrongNoteFeedback = true;
                }, 50);
            } else {
                // Show red immediately
                this.wrongNoteFeedback = true;
            }
            this.wrongGuessStreak = this.wrongGuessStreak ? this.wrongGuessStreak + 1 : 1;

            // If there are too many wrong guesses without listening to the melody,
            // suspend the evaluation of the notes and allow free play.
            if (this.wrongGuessStreak === 4) {
                this.evaluationSuspended = true;
                this.playbackIndex = -1;
            }
            
            this.feedbackTimeout = setTimeout(() => {
                this.wrongNoteFeedback = false;
                this.feedbackTimeout = null;
            }, 1200); 
            this.userProgress = -1;
            this.score = this.score - 10;

            if (this.gameMode) {
                this.lifeCount -= 1;

                // Game over
                if (this.lifeCount === 0) {
                    this.wrongGuessStreak = 0;
                    this.blockAction= true;

                    // This is set to false to avoid hiding note bars
                    this.evaluationSuspended = false;

                    // Don't allow playback or exit game momentarily
                    this.$['play-button'].style['pointer-events'] = 'none';
                    this.$['exit-game-trigger'].style['pointer-events'] = 'none';

                    setTimeout(() => {
                        this.blockAction = false;
                        this.$['play-button'].style['pointer-events'] = 'auto';
                        this.$['exit-game-trigger'].style['pointer-events'] = 'auto';
                        this.$['game-over-dialog'].open();
                    }, 300);
                }
            }
        }
    }

    progressAfterCorrectGuess() {
        // Correct guess!
        // Game mode - Add score and restore lives
        if (this.gameMode) {
            // 40, 50 or 60 earned points
            let earnedPoints = 10 + (this.gameLevel * 10);
            this.score = this.score + earnedPoints;
            this.lifeCount = 4;

        // Warmup mode - end of warmup
        } else if (this.warmupLevel === 20) {
            this.blockAction= true;

            // Don't allow playback or exit game momentarily
            this.$['play-button'].style['pointer-events'] = 'none';
            this.$['exit-game-trigger'].style['pointer-events'] = 'none';

            setTimeout(() => {
                this.blockAction = false;
                this.$['play-button'].style['pointer-events'] = 'auto';
                this.$['exit-game-trigger'].style['pointer-events'] = 'auto';
                this.$['warmup-finished-dialog'].open();
            }, 300);
            return;

        // Warmup mode - continue
        } else if (this.warmupLevel > 0) {
            this.warmupLevel++;
        }

        // Don't allow notes momentarily
        this.blockAction = true;

        // Don't allow playback momentarily
        this.$['play-button'].style['pointer-events'] = 'none';

        // Clear round and start botSequence
        this.restartTimeout = setTimeout(() => {
            this.set('botSequence', []);
            this.userProgress = -1;
            this.$['play-button'].style['pointer-events'] = 'auto';
            this._startPlaybackWithDelay();
            this.restartTimeout = null;
        }, 850);
    }

    /**
     * Compute revealIndex.
     */
    _computeRevealIndex (gameLevel, warmupLevel) {
        let revealIndex;
        if (this.warmupLevel) {
            if (0 <= this.warmupLevel && this.warmupLevel < 3) {
                revealIndex = 2; 
            } else if (3 <= this.warmupLevel && this.warmupLevel < 8) {
                revealIndex = 3;
            } else if (8 <= this.warmupLevel && this.warmupLevel < 14) {
                revealIndex = 4;
            } else if (14 <= this.warmupLevel) {
                revealIndex = 5;
            }
        } else if (this.gameLevel) {
            revealIndex = this.gameLevel;
        }
        return revealIndex;
    }

    _startPlaybackWithDelay() {
        this.blockAction = true;
        this.shadowRoot.querySelector('#play-button-container svg circle').style.transition = 'stroke-dashoffset 1500ms cubic-bezier(0.2, 0.2, 0.7, 0.8)';
        this.shadowRoot.querySelector('#play-button-container svg circle').setAttribute('stroke-dashoffset', 0);
    }

    togglePlayback(e) {
        // Stop if tutorial active, but the playback button is the anticipated user action
        if (this.tutorial.active && !this.tutorial.isElementTarget(e)) {
            return;
        }

        // Toggle state
        this.playback = !this.playback;

        // Dispatch event to the tutorial module
        this.$['play-button'].dispatchEvent(new Event('tutorial-tap'));
        
        // Set back animation on play button
        this._resetPlaybackButtonStrokeOffset();

        // Stop if playback was turned off
        if (!this.playback) {
            return;
        }

        // Turn off free play without evaluation
        this.evaluationSuspended = false;

        // Turn off not being able to hit notes while playback button animation is playing
        this.blockAction = false;
        
        // Reset counting wrong guesses that would switch over to free play
        this.wrongGuessStreak = 0;

        // Reset the guessed notes
        this.userProgress = -1;
        if (this.botSequence.length === 0) {
            this.playbackIndex = -1;
            this._generateSequence();
        }
        this._playBotSequence();
    }

    exitGame(e) {
        if (this.tutorial.active && !this.tutorial.isElementTarget(e)) {
            return;
        }
        this._resetPlaybackButtonStrokeOffset();
        this.blockAction = false;

        // If we are at the end of a correct guess, but the timeout has not kicked in,
        // cancel the timeout and set the ground to the next melody
        if (this.restartTimeout) {
            this.resetRestartTimeout();  
        }

        this.dispatchEvent(
            new CustomEvent('exit-game-request', {
                bubbles: true,
                composed: true
            })
        );
    }

    resetRestartTimeout() {
        this.set('botSequence', []);
        this.$['play-button'].style['pointer-events'] = 'auto';
        window.clearTimeout(this.restartTimeout);
        this.restartTimeout = null;
    }

    _generateSequence() {
        let botSequenceCandidate;
        do {
            botSequenceCandidate = this._doGenerateSequence();
        } while(!this._arraysDiffer(botSequenceCandidate, this.botSequence));
        this.set('botSequence', botSequenceCandidate);
    }

    _doGenerateSequence() {
        const pitchArray =
                this.warmupLevel ? this.warmup.getPitchArray(this.warmupLevel) : this._getPitchArray();
        let numberOfNotes;

        if (this.warmupLevel) {
            numberOfNotes = this.warmup.getNumberOfNotes(this.warmupLevel);
        } else if (this.gameLevel === 3) {
            // 2 or 3
            numberOfNotes = Math.floor(Math.random() * 2) + 2;
        } else {
            // 2, 3 or 4
            numberOfNotes = Math.floor(Math.random() * 3) + 2;
        }
        const fixedWarmupNotes = this.warmup.hasFixedNotes(this.warmupLevel);
        let sequence = [];
        do {
            for (let i = 0; i < numberOfNotes; i++) {
                // Randomly choose note index and set length to normal crotchet
                sequence[i] = { noteIndex: pitchArray[Math.floor(Math.random() * pitchArray.length)], length: 4 };
            }
            // Post warmup
            if (!fixedWarmupNotes) {
                // Going through the crotchet values and replace some with quavers
                let indexesToTransform = [];
                sequence.forEach((item, index) => {
                    // 65% times don't transform to quavers or only once if it's warmup
                    if (Math.random() <= 0.65 || (this.warmupLevel > 0 && indexesToTransform.length > 0 )) {
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
            // Fixed warmup sequence
            } else {
                sequence = this.warmup.insertFixedNotes(this.warmupLevel, sequence);
            }
            // Repeat until melody has at least two different notes
        } while (sequence.filter(item => sequence[0].noteIndex !== item.noteIndex).length === 0);
        return sequence;
    }

    _getPitchArray() {
        let pitchArray;
        const levelMap = {
            3: [3, 4, 0],
            4: [3, 4, 0, 2],
            5: [3, 4, 0, 2, 1]
        };
        if (this.gameLevel === 3) {
            pitchArray = [3, 4, 0];
        } else if (this.gameLevel === 4) {
            pitchArray = [3, 4, 0, 2];
        } else {
            pitchArray = [3, 4, 0, 2, 1];
        }
        return pitchArray;
    }

    _arraysDiffer(arr1, arr2) {
        return arr1.length !== arr2.length || arr1.filter((item, index) => item !== arr2[index]).length > 0;
    }

    _playBotSequence() {
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

    _startGameFromDialog() {
        // Coming from a warmup. Start a game.
        this.gameLevel = 5;
        this.warmupLevel = 0;
        this.startFlow(this.gameLevel, this.warmupLevel);
        this.$['warmup-finished-dialog'].close();
    }

    _restartGameFromDialog() {
        // Already in game mode. Replay the game.
        this.$['game-over-dialog'].close();
        this.startFlow(this.gameLevel, this.warmupLevel);
    }

    _clearGame() {
        this.set('botSequence', []);
        this.userProgress = -1;
        this.playbackIndex = -1;
        this.score = 0;
        this.lifeCount = 4;
        this.blockAction = false;
        this.$['play-button'].style['pointer-events'] = 'auto';
    }

    // Public method
    startFlow(gameLevel, warmupLevel) {
        this._clearGame();
        this.playback = false;
        this.gameLevel = gameLevel || 0;
        this.warmupLevel = warmupLevel || 0;
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(this._startPlaybackWithDelay.bind(this));
        });
        // setTimeout(this._startPlaybackWithDelay.bind(this), 0);
    }

    // Public method
    stopPlayback() {
        this.playback = false;

        // Clear displayed notes if the melody hasn't been fully played.
        if (this.playbackIndex < this.botSequence.length - 1) {
            this.playbackIndex = -1;
        }

        // If animated restart is due to start, clear it
        if (this.restartTimeout) {
            this.resetRestartTimeout();  
        }

        // If animated restart is ongoing, stop it
        this._resetPlaybackButtonStrokeOffset();
    }

    /*
    UI helper to compute the height of the overlay covering the heart symbol 
    **/
    _computeLifeOverlayHeight() {
        let styleString;
        if (this.lifeCount === 4) {
            styleString = 'height: 0;';
        } else if (this.lifeCount === 3) {
            styleString = 'height: 25%;';
        } else if (this.lifeCount === 2) {
            styleString = 'height: 50%;';
        } else if (this.lifeCount === 1) {
            styleString = 'height: 75%;';
        } else {
            styleString = 'height: 100%';
        }
        return styleString;
    }

    _computeWarmupIconOpacity(warmupDisplayLevel, markupInstance) {
        let styleString;
        if (warmupDisplayLevel >= markupInstance) {
            styleString = 'opacity: 1;'
        } else {
            styleString = 'opacity: 0.2;'
        }
        return styleString;
    }

    _computeWarmupDisplayLevel(warmupLevel) {
        if (!this.warmup || !this.warmupLevel) {
            return;
        }
        return this.warmup.getPitchArray(warmupLevel).length;
    }

    _computeProgressClass(item, itemIndex, userProgress, playbackIndex) {
        let classString = 'progress-section';
        if (item.length === 2) {
            classString += ' flex';
        } else {
            classString += ' flex-2'
        }
        if (itemIndex > playbackIndex) {
            classString += ' concealed';
        }
        if (itemIndex <= userProgress) {
            classString += ' correct';
        }
        return classString;
    }

    _resetPlaybackButtonStrokeOffset() {
        this.shadowRoot.querySelector('#play-button-container svg circle').style.transition = 'none';
        this.shadowRoot.querySelector('#play-button-container svg circle').setAttribute('stroke-dashoffset', 252);
    }

    _isSmaller(compared, base) {
        return compared < base;
    }

    _computeGameMode(gameLevel) {
        return gameLevel > 0;
    }

    _computeWarmupMode(warmupLevel) {
        return warmupLevel > 0;
    }
}
customElements.define(PieGame.is, PieGame);
