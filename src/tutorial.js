class Tutorial {
  constructor(view) {
      this._tooltip = view.$['tooltip'];
      this._tooltipTextElement = view.$['tooltip-text'];
      this._tooltipArrowElement = view.$['tooltip-arrow'];
      this._view = view;
      this._active = true;
      this._activeTarget = null;
      this._proceedToNextStep = this.proceedToNextStep.bind(this);
      view.set('botSequence', [{ noteIndex: 0, length: 4 }, { noteIndex: 3, length: 4 }]);
    }
   
    get active() {
      return this._active;
    }

    set stepList(stepList) {
      this._stepList = stepList;
      this.setStep(this._stepList.shift(), 0);
    }

    setStep(step) {
      if (typeof step === 'undefined') {
        this._active = false;
        this._view.dispatchEvent(new Event('tutorial-finished'));
        return;
      }
      const userTarget = this._view.$[step.userTarget];
      const tooltipTarget = this._view.$[step.tooltipTarget];
      if (userTarget) {
        this.setUserStep(userTarget);
        this.openTooltip(tooltipTarget, step.tooltipText);
      } else if (step.appEvent) {
        this.setAppStep(step.appEvent);
        this._tooltip.close();
      } else {
        this.openTooltip(tooltipTarget, step.tooltipText);
        this._tooltipArrowElement.setAttribute('hidden', true);
        setTimeout(() => {
          this._tooltip.close();
          this._tooltipArrowElement.removeAttribute('hidden', true);
          this.setStep(this._stepList.shift());
        }, step.duration);
      }

      // Add a bit of delay before a user action is accepted on the target
      // This will allow the tooltip to properly display before continuing
      this._activeTarget = null;
      setTimeout(() => {
        this._activeTarget = userTarget ? userTarget : null;
      }, 350);
    }

    openTooltip(target, text) {
      this._tooltip.positionTarget = target;
      this._tooltipTextElement.innerHTML = text;
      this._tooltip.open();
      this._tooltip.notifyResize();
    }

    /**
     * A public method to find out if an element is currently targeted by the tutorial
     */

    isElementTarget(e) {
      return this._active && this._activeTarget === e.currentTarget;
    }

    setUserStep(target) {
      target.addEventListener('tutorial-tap', this._proceedToNextStep, {once: true});
    }

    setAppStep(appEvent) {
      this._view.addEventListener(appEvent, this._proceedToNextStep, {once: true});
    }

    proceedToNextStep(e) {
      window.requestAnimationFrame(() => {
        this.setStep(this._stepList.shift());
      });
    }
}