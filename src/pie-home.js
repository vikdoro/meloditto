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
            }
            h1 {
                font-size: 20px;
                margin: 24px 0 0 24px;
            }
            h3 {
                font-size: 20px;
                color: #f5f5f5;
                margin: 0 0 42px;
            }
            p {
                text-align: center;
                line-height: 20px;
                margin: 0 0 36px;
            }
            #pie-home-body {
                padding: 42px 30px;
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
                background: #22272d;
                color: #FFF;
                margin: 0 auto 42px;
                border: 1px solid #cfd8dc;
                border-radius: 5px;
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
        <div id="home-top-bar" class="horizontal layout center">
            <h1 class="flex">Settings</h1>
            <div id="quit-settings-trigger" on-down="quitSettings">
                <iron-icon icon="pie-icons:close"></iron-icon>
            </div>
        </div>
        <div id="pie-home-body">
            
            <button id="cta"
                    type="button"
                    on-down="restartGame">Restart</button>
            <button id="cta"
                    type="button"
                    data-warmup
                    on-down="restartGame">Restart with warmup</button>
            <template is="dom-if" if="[[isPremiumActive]]">
                <div class="horizontal layout center">
                    <div class="flex">Premium samples</div>
                    <div class="switch-container">
                        <input id="premium-switch" class="switch" type="checkbox">
                        <label for="premium-switch"></label>
                    </div>
                </div>
            </template>
            <template is="dom-if" if="[[!isPremiumActive]]">
                <div class="vertical layout center">
                    <p>Play with the sound of a real piano:</p>
                    <button id="cta"
                                type="button"
                                on-down="openPurchaseDialog">Upgrade to premium</button>
                </div>
            </template>
        </div>
        `;
    }

    static get is() { return 'pie-home'; }
    static get properties() {
        return {
            isPremiumActive: {
                type: Boolean,
                value: false
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
    restartGame(e) {
        this.dispatchEvent(
            new CustomEvent('restart-game-request', {
                bubbles: true,
                composed: true,
                detail: {
                    warmup: e.currentTarget.getAttribute('data-warmup') !== null
                }
            })
        );
    }
}
customElements.define(PieHome.is, PieHome);
