export default class Tutorial {
  constructor(tooltip, tooltipTextElement, tooltipArrowElement, view) {
      this._tooltip = tooltip;
      this._tooltipTextElement = tooltipTextElement;
      this._tooltipArrowElement = tooltipArrowElement;
      this._view = view;
      this._active = true;
      this._activeTarget = null;
      this.proceedToNextStep = this.proceedToNextStep.bind(this);
    }
   
    get active() {
      return this._active;
    }
    set active(newValue) {
      this._active = newValue;
    }
    get activeTarget() {
      return this._activeTarget;
    }
    get tooltip() {
      return this._tooltip;
    }

    set tooltip(newTooltip) {
      this._tooltip = newTooltip;
    }


    get tooltipDialog() {
      return this._tooltipDialog;
    }

    set tooltipDialog(newTooltipDialog) {
      this._tooltipDialog = newTooltipDialog;
    }

    get stepList() {
      return this._stepList;
    }

    set stepList(stepList) {
      this._stepList = stepList;
      this.setStep(this._stepList.shift(), 0);
    }
    test() {
      this._view.shadowRoot.querySelector('#tooltip').open();
    }
    setStep(step) {
      if (typeof step === 'undefined') {
        this._active = false;
        return;
      }
      if (step.userTarget) {
        this.setUserStep(step.userTarget);
        this.openTooltip(step.tooltipTarget, step.tooltipText);
        
      } else if (step.appEvent) {
        this.setAppStep(step.appEvent);
        this._tooltip.close();
      } else {
        this.openTooltip(step.tooltipTarget, step.tooltipText);
        this._tooltipArrowElement.setAttribute('hidden', true);
        setTimeout(() => {
          this._tooltip.close();
          this._tooltipArrowElement.removeAttribute('hidden', true);
          this.setStep(this._stepList.shift());
        }, step.duration);
      }
      this._activeTarget = step.userTarget ? step.userTarget : null;
    }
    openTooltip(target, text,) {
      this._tooltip.positionTarget = target;
      this._tooltipTextElement.innerHTML = text;
      this._tooltip.open();
      this._tooltip.notifyResize();
    }
    setUserStep(target) {
      target.addEventListener('tutorial-tap', this.proceedToNextStep);
    }
    setAppStep(appEvent) {
      this._view.addEventListener(appEvent, this.proceedToNextStep);
    }
    proceedToNextStep(e) {
      e.currentTarget.removeEventListener('tutorial-tap', this.proceedToNextStep);
      this.setStep(this._stepList.shift());
    }
    // Method
    runNext() {
      this._tutorialLevel += 1;
      const noteElements = [...view.shadowRoot.querySelectorAll('.note')];
      switch (this._tutorialLevel) {
        case 1:
          this.tutorialText = 'Click here to play a melody!';
          break;
        case 2:
          this.$.tooltip.close();
          break;
        case 3:
          this.tutorialText = 'now this';
          noteElements.forEach(note => {
            if (note.id !== 'note-0') {
              note.parentElement.classList.add('disable-pointer');
            }
          });
          this.openTooltip(this.$['note-0']);
          break;
        case 4:
          noteElements.forEach(note => {
            note.parentElement.classList.remove('disable-pointer');
          });
          this.$.tooltip.close();
          break;
        case 5:
          this.tutorialText = 'now this';
          this.openTooltip(this.$['note-0']);
          break;
        case 9:
          sequence[0] = { noteIndex: 2, length: 4 };
          break;
        case 14:
          sequence[sequence.length - 1] = { noteIndex: 1, length: 4 };
          break;
        case 15:
          sequence[0] = { noteIndex: 1, length: 4 };
          break;
      }
    }
}