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
                background: #1B1F23;
            }
            
            #pager {
                height: 100%;
            }

            pie-game {
                height: 100%;
            }

            pie-home {
                min-height: 100%;
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
            [hidden] {
                display: none !important;
            }
        </style>
        <iron-pages id="pager" attr-for-selected="data-route" selected="[[section]]">
            <pie-home id="pie-home"
                      data-route="home"
                      on-quit-settings-request="navigateToGame"
                      on-restart-game-request="proceedToStartGame"></pie-home>
            <pie-game id="pie-game"
                      data-route="game"
                      on-exit-game-request="navigateToHome"></pie-game>
        </iron-pages>
        `;
    }

    static get is() { return 'pie-app'; }
    static get properties() {
        return {
            section: {
                type: String,
                value: 'game'
            },
            isAttached: {
                type: Boolean,
                notify: true
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.isAttached = true;
    }

    getGameComponent() {
        return this.$['pie-game'];
    }

    navigateToHome() {
        this.section = 'home';
    }

    navigateToGame() {
        this.section = 'game';
    }

    startGame () {
        this.section = 'game';
        this.$['pie-game'].init();
    }

    proceedToStartGame(e) {
        const gameLevel = e.detail.gameLevel;
        const warmupLevel = e.detail.warmupLevel;
        this.section = 'game';
        this.$['pie-game'].startFlow(gameLevel, warmupLevel);
    }
}
customElements.define(PieApp.is, PieApp);
