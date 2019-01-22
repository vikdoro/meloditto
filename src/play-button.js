import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';

class PlayButton extends PolymerElement {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment">
            :host {
                display: block;
            }
            button {
                box-sizing: border-box;
                padding: 16px;           
                border: none;
                outline: none;       
                fill: rgba(255,255,255,0.9);
                background-color: slategray;         
                border-radius: 50%;
                cursor: pointer;
                margin: 0; /* Safari */
                -webkit-tap-highlight-color: transparent; /* Android */
            }
            svg {
                height: 30px;
                width: 30px;
                display: block;
            }
            [hidden] {
                display: none !important;
            }
        </style>
        <button>
            <svg id="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path id="play-icon-path" d="M11,8 L26,16 11,24 11,8">
                <animate id="play-icon-animate" attributeName="d" fill="freeze" dur="0.1s"
                        calc-mode="spline" keySplines="0.19 1 0.22 1"/>
            </path>
            </svg>
        </button>
        `;
    }

    static get is() { return 'play-button'; }
    static get properties() {
        return {
            playPath: {
                type: String,
                value: 'M11, 8 L18, 11.74 18, 20.28 11, 24 11, 8 M18, 11.74 L26, 16 26, 16 18, 20.28 18, 11.74'
            },
            pausePath: {
                type: String,
                value: 'M9, 8 L14, 8 14, 24 9, 24 9, 8 M19, 8 L24, 8 24, 24 19, 24 19,8'
            },
            state: {
                type: Boolean,
                value: true
            },
            timeout: {
                type: Number
            },
            playback: {
                type: Boolean,
                value: false,
                observer: 'onPlayBackChanged'
            }
        }
    }
    constructor () {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
        this.originalPath = this.$['play-icon-path'].getAttribute('d');
    }
    onPlayBackChanged(newValue, oldValue) {
        // On start
        if (newValue) {
            this.toState(false);
        // On stop
        } else {
            this.toState(true);
        }
    }
    toState(state) {
        if (state === this.state) {
            return;
        }
        
        // Pause animate to play
        if (state) {
            this._setPaths(this.playPath, this.pausePath, this.playPath);
        // Play animate to pause
        } else {
            this._setPaths(this.pausePath, this.playPath, this.pausePath);
        }
    
        this.state = state;
        this.$['play-icon-animate'].beginElement();
    
        // Set the path after the animation ends
        if (this.originalPath) {
            this.timeout ? clearTimeout(this.timeout) : null;
            this.timeout = setTimeout(this._resetOriginal.bind(this), 100);
        }
    }  
    toggle() {
        // Signal to start playing
        this.toState(!this.state);
    }
    _setPaths(d, from, to) {
        this.$['play-icon-path'].setAttribute('d', d);
        this.$['play-icon-animate'].setAttribute('from', from);
        this.$['play-icon-animate'].setAttribute('to', to);
    }
    _resetOriginal() {
        // Apply only when reverting back (pause to play)
        if (this.state) {
            this._setPaths(this.originalPath, '', '');
        }
    }
}
customElements.define(PlayButton.is, PlayButton);
