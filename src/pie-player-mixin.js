import '@polymer/polymer/lib/utils/boot.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

let PiePlayerMixinInternal = (superClass) => {
    return class extends superClass {
        constructor() {
            super();
        }
        static get properties() {
            return {
                language: {
                    type: String,
                    value: () => {
                        let language = window.navigator.userLanguage || window.navigator.language
                        return language === 'hu' ? 'hu' : 'hu';
                    },
                }
            }
        }
        connectedCallback() {
            super.connectedCallback();
        }
        playSound(note, time=0) {
            const source = window.context.createBufferSource();
            source.buffer = window.bufferLoader.bufferList[note];
            source.connect(window.context.destination);
            source.start(window.context.currentTime + time);
        }
        localize(code) {
            return this.keyMap[this.language][code];
        }
    }
};
export const PiePlayerMixin = dedupingMixin(PiePlayerMixinInternal);
