class Lib {
  static globalParams = {};
  /**
   * @param  {...HTMLButtonElement|HTMLInputElement} elems
   */
  static disableElements(...elems) {
    for (let elem of elems) {
      elem.disabled = true;
    }
  }

  static displayAreaForm() {
    let state = {
      stage: 1,
      areaProps: {},
    };

    function setStage(value) {
      state.stage = value;

      let props = {
        1: {
          child: Component.areaToolSectionOne({
            id: "a83",
            state,
            setAreaId,
            setAreaProps,
          }),
          buttons: [
            Component.ToolFormCancelButton({ state }),
            Component.ToolFormNextButton({ state, setStage }),
          ],
        },
        2: {
          child: Component.areaToolFormPositionSection({
            id: "23e",
            state,
            setAreaProps,
          }),
          buttons: [
            Component.ToolFormCancelButton({ state }),
            Component.ToolFormBackButton({ state, setStage }),
            Component.ToolFormNextButton({ state, setStage }),
          ],
        },
        3: {
          child: Component.areaToolFormSizeSection({
            id: "ade",
            state,
            setAreaProps,
          }),
          buttons: [
            Component.ToolFormCancelButton({ state }),
            Component.ToolFormBackButton({ state, setStage }),
            Component.ToolFormCreateButton({ state }),
          ],
        },
      };

      toolForm.innerHTML = "";
      toolForm.append(Component.areaToolFormLayout(props[state.stage]));
    }

    function setAreaId(value) {
      Board.updateAreaIdEdit(state.areaProps.id, value);
      state.areaProps.id = value;
    }

    function setAreaProps(value) {
      for (let key in value) {
        state.areaProps[key] = value[key];
      }

      Board.updateAreaEdit(state.areaProps);
    }

    setAreaProps({
      id: Board.getUniqueAreaId(),
      name: "",
      type: "seat",
      x: Board.arenaSize.width / 20,
      y: Board.arenaSize.length / 20,
      width: Board.arenaSize.width / 10,
      length: Board.arenaSize.length / 10,
    });
    setStage(1);

    let { x, y } = Lib.getPositionsForToolForm(toolArea);
    toolForm.style.transform = `translate(${x}px, ${y}px)`;
  }

  /**
   * @param  {...HTMLButtonElement|HTMLInputElement} elems
   */
  static enableElements(...elems) {
    for (let elem of elems) {
      elem.disabled = false;
    }
  }

  /**
   * @param {HTMLElement} relativeElem
   * @returns {{x: number, y: number}}
   */
  static getPositionsForToolForm(relativeElem) {
    return {
      x: relativeElem.getBoundingClientRect().left + 2,
      y: header.getBoundingClientRect().bottom + 4,
    };
  }

  static parseHtml(htmlstring) {
    let div = document.createElement("div");
    let fragement = new DocumentFragment();

    div.innerHTML = htmlstring;
    fragement.append(...div.children);

    return fragement;
  }

  static slideOutToolForm() {
    toolForm.style.transform = `translate(${-toolForm.getBoundingClientRect()
      .right}px, ${header.getBoundingClientRect().bottom + 4}px`;
  }

  static startContinousScaleDownAfter500ms() {
    this.globalParams.scaleDownSetTime = setTimeout(() => {
      this.globalParams.scaleDownSetInerval = setInterval(() => {
        State.scale -= 0.01;
      }, 25);
    }, 300);
  }

  static startContinousScaleUpAfter500ms() {
    this.globalParams.scaleUpSetTime = setTimeout(() => {
      this.globalParams.scaleUpSetInerval = setInterval(() => {
        State.scale += 0.01;
      }, 25);
    }, 300);
  }

  static stopContinousScale() {
    if (this.globalParams.scaleDownSetTime !== undefined)
      clearTimeout(this.globalParams.scaleDownSetTime);
    if (this.globalParams.scaleDownSetInerval !== undefined)
      clearInterval(this.globalParams.scaleDownSetInerval);
    if (this.globalParams.scaleUpSetTime !== undefined)
      clearTimeout(this.globalParams.scaleUpSetTime);
    if (this.globalParams.scaleUpSetInerval !== undefined)
      clearInterval(this.globalParams.scaleUpSetInerval);
  }
}
