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
                background: #13171b;
            }

            .home-card {
                padding: 24px;
            }

            .home-card:last-of-type {
                padding: 16px 24px;
            }

            h1 {
                font-size: 20px;
                margin: 24px 0 0 24px;
            }

            h3 {
                background: #1B1F23;
                font-size: 16px;
                color: #bdbdbd;
                letter-spacing: 0.8px;
                padding: 16px 32px;
                margin: 0;
            }

            h3:first-of-type {
                padding-top: 0;
            }

            p {
                text-align: center;
                line-height: 20px;
                margin: 0 0 16px;
            }

            #pie-home-body {
                position: relative;
                top: -24px;
            }

            #home-top-bar {
                background: #1B1F23;
            }

            #quit-settings-trigger {
                position: relative;
                z-index: 10;
                box-sizing: border-box;
                padding: 16px;
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
                        on-down="startGameOrWarmup">Start game</button>
            </div>
            <h3>Training</h3>
            <div class="home-card">
                <button type="button"
                        data-warmup
                        on-down="startGameOrWarmup">Start training</button>
            </div>
        </div>
        `;
    }

    static get is() { return 'pie-home'; }
    static get properties() {
        return {
            gameLevel: {
                type: Number,
                value: 5
            }
        }
    }

    quitSettings() {
        this.dispatchEvent(
            new CustomEvent('quit-settings-request', {
                bubbles: true,
                composed: true
            })
        );
    }

    /**
     *  Set the game level from the displayed options.
     */
    selectGameLevel(e) {
        const elements = [...this.shadowRoot.querySelectorAll('.level-bar')];
        elements.forEach(el => {
            el.classList.remove('selected');
        });       
        const selectionLabel = e.currentTarget.getAttribute('data-game-level');
        this.gameLevel = parseInt(e.currentTarget.getAttribute('data-game-level'));
        e.currentTarget.classList.add('selected');
    }

    /**
     *  Dispatch event to start a game or a warmup.
     */
    startGameOrWarmup(e) {
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
