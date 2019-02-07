import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-dialog/paper-dialog.js';
import './pie-icons.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class PieHome extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment iron-flex-factors">
            :host {
                display: block;
                color: #f5f5f5;
                background: #202124;
            }
            .home-card {
                background: #22272d;
                padding: 24px;
                margin-bottom: 18px;
            }
            h1 {
                font-size: 20px;
                margin: 24px 0 0 24px;
            }
            h3 {
                font-size: 20px;
                color: #bdbdbd;
                margin: 0 30px 18px;
            }
            p {
                text-align: center;
                line-height: 20px;
                margin: 0 0 36px;
            }
            #pie-home-body {
            }
            #top-section {
                width: 100%;
                opacity: 1;
                color: white;
            }
            #quit-settings-trigger {
                box-sizing: border-box;
                padding: 16px 12px 16px 16px;
            }
            .switch-container {
                width: 48px;
                margin: 12px 0;
            }

            .switch {
                visibility: hidden;
                position: absolute;
                margin-left: -9999px;
            }

            .switch + label {
                display: block;
                position: relative;
                cursor: pointer;
                outline: none;
                user-select: none;
                padding: 2px;
                width: 48px;
                height: 24px;
                background-color: #dddddd;
                border-radius: 24px;
            }

            .switch+ label:before,
            .switch + label:after {
                display: block;
                position: absolute;
                top: 1px;
                left: 1px;
                bottom: 1px;
                content: "";
            }

            .switch + label:before {
                right: 1px;
                background-color: #9e9e9e;
                border-radius: 24px;
                transition: background 0.4s;
            }

            .switch + label:after {
                width: 26px;
                background-color: #fff;
                border-radius: 100%;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                transition: all 0.4s;
            }

            .switch:checked + label:before {
                background-color: #66bb6a;
            }

            .switch:checked + label:after {
                transform: translateX(24px);
            }

            button {
                display: block;
                font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.9px;
                background: #202124;
                color: #FFF;
                margin: 0 auto;
                border: 1px solid #cfd8dc;
                border-radius: 5px;
            }
            .level-label {
                border-bottom: 1px solid #f5f5f5;
                padding: 12px 0;
            }
            .level-bar.selected .level-selection-check-container {
                background: yellow;
            }
            .level-selection-check-container {
                width: 48px;
                text-align: center;
            }
            #level-selector {
                margin-bottom: 24px;
            }
            button#upgrade-btn {
                padding: 12px 18px;
            }
            button#cta {
                padding: 12px 18px;
            }
            iron-icon {
                --iron-icon-width: 21px;
                --iron-icon-height: 21px;
            }
            [hidden] {
                display: none !important;
            }
        </style>
        <div id="home-top-bar" class="horizontal layout center end-justified">
            <div id="quit-settings-trigger" on-down="quitSettings">
                <iron-icon icon="pie-icons:close"></iron-icon>
            </div>
        </div>
        <div id="pie-home-body">
            <h3>Game</h3>
            <div class="home-card">
                <div id="level-selector">
                    <div class="level-bar horizontal layout"
                         data-game-level="3"
                         on-down="selectGameLevel">
                        <div class="level-selection-check-container">X</div>
                        <div class="level-label flex">One</div>
                    </div>
                    <div class="level-bar horizontal layout"
                         data-game-level="4"
                         on-down="selectGameLevel">
                        <div class="level-selection-check-container"></div>
                        <div class="level-label flex">Two</div>
                    </div>
                    <div class="level-bar horizontal layout"
                         data-game-level="5"
                         on-down="selectGameLevel">
                        <div class="level-selection-check-container"></div>
                        <div class="level-label flex">Three</div>
                    </div>
                </div>
                <button id="cta"
                        type="button"
                        data-game-start
                        on-down="restartGame">Start game</button>
            </div>
            <h3>Training</h3>
            <div class="home-card">
                <button id="cta"
                        type="button"
                        data-warmup
                        on-down="restartGame">Start training</button>
            </div>
            <h3>Premium</h3>
            <div class="home-card"> 
                <template is="dom-if" if="[[isPremiumActive]]">
                    <div class="horizontal layout center">
                        <div class="flex">Footer</div>
                        <div class="switch-container">
                            <input id="premium-switch" class="switch" type="checkbox">
                            <label for="premium-switch"></label>
                        </div>
                    </div>
                </template>
                <template is="dom-if" if="[[!isPremiumActive]]">
                    <div class="vertical layout center">
                        <p>Upload the doc</p>
                        <button id="cta"
                                    type="button"
                                    on-down="openPurchaseDialog">Add annotation</button>
                    </div>
                </template>
            </div>
        </div>
        `;
    }

    static get is() { return 'pie-home'; }
    static get properties() {
        return {
            isPremiumActive: {
                type: Boolean,
                value: false
            },
            gameLevel: {
                type: Number,
                value: 0
            }
        }
    }
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    purchaseConfirmed() {
        console.log('dismissed');
        store.order('premium1');
    }
    openPurchaseDialog() {
        console.log('open dialog');
        navigator.notification.confirm(
            'Do you want to buy one Premium Sample Pack for €2.29?',
            this.purchaseConfirmed,
            'Confirm Your In-App Purchase',
            ['Cancel', 'Buy']
        );
    }
    quitSettings() {
        this.dispatchEvent(
            new CustomEvent('quit-settings-request', {
                bubbles: true,
                composed: true
            })
        );
    }
    selectGameLevel(e) {
        const elements = [...this.shadowRoot.querySelectorAll('.level-bar')];
        elements.forEach(el => {
            el.classList.remove('selected');
        });       
        const selectionLabel = e.currentTarget.getAttribute('data-game-level');
        this.gameLevel = parseInt(e.currentTarget.getAttribute('data-game-level'));
        e.currentTarget.classList.add('selected');
    }
    restartGame(e) {
        const gameLevel = e.currentTarget.getAttribute('data-game-start') !== null ?
             this.gameLevel : 0;
        const warmupLevel = e.currentTarget.getAttribute('data-warmup') !== null ? 1 : 0;
        this.dispatchEvent(
            new CustomEvent('restart-game-request', {
                bubbles: true,
                composed: true,
                detail: {
                    warmupLevel,
                    gameLevel
                }
            })
        );
    }
}
customElements.define(PieHome.is, PieHome);
