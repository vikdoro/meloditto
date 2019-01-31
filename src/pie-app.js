import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-pages/iron-pages.js';
import './pie-home.js';
import './pie-game.js';
import './pie-icons.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class PieApp extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment iron-flex-factors">
            :host {
                display: block;
            }
            #pager, #pager > * {
                height: 100%;
            }
            [hidden] {
                display: none !important;
            }
        </style>
        <iron-pages id="pager" attr-for-selected="data-route" selected="[[section]]">
            <pie-home id="pie-home"
                      data-route="home"
                      on-quit-settings-request="navigateToGame"
                      on-restart-game-request="proceedToRestartGame"></pie-home>
            <pie-game id="pie-game"
                      data-route="game"
                      on-quit-game-request="navigateToHome"></pie-game>
        </iron-pages>
        `;
    }

    static get is() { return 'pie-app'; }
    static get properties() {
        return {
            section: {
                type: String,
                value: 'home'
            }
        }
    }
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    navigateToHome() {
        this.section = 'home';
    }
    navigateToGame() {
        this.section = 'game';
    }
    proceedToRestartGame(e) {
        this.section = 'game';
        this.$['pie-game'].restartGame(e.detail.warmup);
    }
}
customElements.define(PieApp.is, PieApp);
