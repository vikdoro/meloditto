import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';

class PieApp extends PolymerElement {
    static get template() {
        return html`
        <style is="custom-style" include="iron-flex iron-flex-alignment">
            :host {
                display: block;
                background: #f5f5f5;
                padding: 120px;
                --cell-size: 70px;
            }
            .wrapper {
                width: calc((var(--cell-size) * 9) + 18px);
                height: calc((var(--cell-size) * 9) + 18px);
            }

            .cell {
                border: 1px solid #eee;
                height: var(--cell-size);
                width: var(--cell-size);
            };

             .key {
                background: #eee;
            };

            .sector:hover {
                background: #009;
            }

            [hidden] {
                display: none !important;
            }
        </style>
        <div class="wrapper horizontal layout wrap">
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell key" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>        
            <div class="cell" on-click="hit"></div>
            <div class="cell key" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell key" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell key" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>   
            <div class="cell key" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>        
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>   
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>   
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>
            <div class="cell" on-click="hit"></div>

        </div>
        `;
    }

    static get is() { return 'pie-app'; }
    static get properties() {
        return {
        }
    }
    static get observers() {
        return [
        ];
    }
    constructor() {
        super();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    hit(e) {
        e.stopPropagation();
        const key = e.currentTarget;
        key.classList.toggle('hit');
    }
}
customElements.define(PieApp.is, PieApp);
