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
                color: #9fa4a8;
                background: #1B1F23;
            }

            .home-card {
                background: #13171b;
                padding: 24px;
            }

            .home-card:not(:last-of-type) {
                margin-bottom: 16px;
            }

            .home-card:last-of-type {
                padding: 16px 24px;
            }

            h1 {
                font-size: 20px;
                margin: 24px 0 0 24px;
            }

            h3 {
                font-size: 16px;
                color: #bdbdbd;
                letter-spacing: 0.8px;
                margin: 0 32px 16px;
            }

            p {
                text-align: center;
                line-height: 20px;
                margin: 0 0 16px;
            }

            #pie-home-body {
                position: relative;
                top: -8px;
            }

            #top-section {
                width: 100%;
                opacity: 1;
                color: white;
            }

            #quit-settings-trigger {
                box-sizing: border-box;
                padding: 16px 12px 6px 16px;
            }

            #premium-switch {
                touch-action: manipulation;
            }

            .switch-container {
                width: 86px;
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
                width: 86px;
                height: 62px;
                background-color: transparent;
                border-radius: 24px;
                touch-action: manipulation;
                box-sizing: border-box;
            }

            .switch+ label:before,
            .switch + label:after {
                display: block;
                position: absolute;
                top: 18px;
                left: 32px;
                bottom: 18px;
                content: "";
            }

            .switch + label:before {
                right: 4px;
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
                background-color: #2e7d32;
            }

            .switch:checked + label:after {
                transform: translateX(24px);
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
                margin: 0 auto;
                border: 1px solid rgba(255,255,255,0.5);
                border-radius: 5px;
            }

            .level-label {
                border-bottom: 1px solid rgba(255,255,255,0.3);
                padding: 12px 0;
            }

            .level-bar:not(.selected) iron-icon {
                display: none !important;
            }

            .level-selection-check-container {
                width: 48px;
                text-align: center;
            }

            #level-selector {
                margin-bottom: 24px;
            }

            button#upgrade-btn {
                margin-bottom: 24px;
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
                        <div class="level-selection-check-container vertical layout center-center">
                            <iron-icon icon="pie-icons:done"></iron-icon>
                        </div>
                        <div class="level-label flex">3 notes</div>
                    </div>
                    <div class="level-bar horizontal layout"
                         data-game-level="4"
                         on-down="selectGameLevel">
                        <div class="level-selection-check-container vertical layout center-center">
                            <iron-icon icon="pie-icons:done"></iron-icon>
                        </div>
                        <div class="level-label flex">4 notes</div>
                    </div>
                    <div class="level-bar horizontal layout selected"
                         data-game-level="5"
                         on-down="selectGameLevel">
                        <div class="level-selection-check-container vertical layout center-center">
                            <iron-icon icon="pie-icons:done"></iron-icon>
                        </div>
                        <div class="level-label flex">5 notes</div>
                    </div>
                </div>
                <button type="button"
                        data-game-start
                        on-down="restartGame">Start game</button>
            </div>
            <h3>Training</h3>
            <div class="home-card">
                <button type="button"
                        data-warmup
                        on-down="restartGame">Start training</button>
            </div>
            <h3>Premium</h3>
            <div class="home-card"> 
                <template is="dom-if" if="[[premiumUser]]">
                    <div class="horizontal layout center">
                        <div class="flex">Premium samples</div>
                        <div class="switch-container">
                            <input id="premium-switch" class="switch" type="checkbox" on-change="onPremiumSoundChange">
                            <label for="premium-switch" on-down="switchPremiumSound"></label>
                        </div>
                    </div>
                </template>
                <template is="dom-if" if="[[!premiumUser]]">
                    <div class="vertical layout center">
                        <p>The sound of a real piano</p>
                        <button id="upgrade-btn"
                                type="button"
                                on-down="openPurchaseDialog">Buy premium</button>
                    </div>
                </template>
            </div>
        </div>
        `;
    }

    static get is() { return 'pie-home'; }
    static get properties() {
        return {
            premiumUser: {
                type: Boolean
            },
            premiumSound: {
                type: Boolean,
                notify: true,
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
    onPremiumSoundChange(e) {
        this.premiumSound = e.currentTarget.checked;
    }
    purchaseConfirmed() {
        console.log('dismissed');
        store.order('melowise1')
                .initiated(function () {
                    console.log('ORDER INITIATED YOYOYOYO');
                    // order initiated, waiting approval...
                })
                .error(function (err) {
                    console.log('ORDER ERRORR BOOOOOOOO');
                });
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
    switchPremiumSound(e) {
        e.preventDefault();
        this.shadowRoot.querySelector('#premium-switch').checked = !this.shadowRoot.querySelector('#premium-switch').checked;
        console.log('switch premium');
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
