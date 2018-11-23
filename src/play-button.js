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
                width: 150px;
                box-sizing: border-box;
                padding: 30px;
                margin: 0 15px;              
                border: none;
                outline: none;       
                fill: rgba(255,255,255,0.9);
                background-color: slategray;         
                border-radius: 50%;
                box-shadow: 0 5px 10px rgba(0,0,0,0.25);
                cursor: pointer;
            }

            [hidden] {
                display: none !important;
            }
        </style>
        <button on-click="toggle">
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
            animationDuration: {
                type: Number,
                value: 100
            },
            state: {
                type: Boolean,
                value: true
            },
            timeout: {
                type: Number
            }
        }
    }
    static get observers() {
        return [


        ];
    }
    constructor () {
        super();
    }
    connectedCallback () {
        super.connectedCallback();
        this.originalPath = this.$['play-icon-path'].getAttribute('d');
    }
    toState (state) {
        if (state == this.state) {
            return;
        }
        
        if (state) {
            this._setPaths(this.playPath, this.pausePath, this.playPath);
            this.styleClass ? this.$['play-icon'].classList.add(this.styleClass) : null;
        } else {
            this._setPaths(this.pausePath, this.playPath, this.pausePath);
            this.styleClass ? this.$['play-icon'].classList.remove(this.styleClass) : null;
        }
    
        this.state = state;
        this.$['play-icon'].beginElement();
    
        if (this.originalPath && this.animationDuration) {
            this.timeout ? clearTimeout(this.timeout) : null;
            this.timeout = setTimeout(this._resetOriginal.bind(this), this.animationDuration);
        }
    }  
    toggle () {
        this.toState(!this.state);
    }
    _setPaths (d, from, to) {
        this.$['play-icon-path'].setAttribute('d', d);
        this.$['play-icon'].setAttribute('from', from);
        this.$['play-icon'].setAttribute('to', to);
    }
    _resetOriginal = function() {
        if (this.state) {
            this._setPaths(this.originalPath, '', '');
        }
    }
}
customElements.define(PlayButton.is, PlayButton);
