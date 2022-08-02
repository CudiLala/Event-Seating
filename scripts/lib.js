class Lib {
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
          child: Component.areaToolFormNameSection({
            id: "a83",
            state,
            setAreaName,
          }),
          buttons: [
            Component.ToolFormCancelButton(state.areaProps.name),
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
            Component.ToolFormCancelButton(state.areaProps.name),
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
            Component.ToolFormCancelButton(state.areaProps.name),
            Component.ToolFormBackButton({ state, setStage }),
            Component.ToolFormCreateButton(state.areaProps.name),
          ],
        },
      };

      toolForm.innerHTML = "";
      toolForm.append(Component.areaToolFormLayout(props[state.stage]));
    }

    function setAreaName(value) {
      Board.updateAreaNameEdit(state.areaProps.name, value);
      state.areaProps.name = value;
    }

    function setAreaProps(value) {
      for (let key in value) {
        state.areaProps[key] = value[key];
      }

      Board.updateAreaEdit(state.areaProps);
    }

    setAreaName("Area 1");
    setAreaProps({
      x: Board.arenaSize.width / 20,
      y: Board.arenaSize.length / 20,
      width: Board.arenaSize.width / 10,
      length: Board.arenaSize.length / 10,
    });
    setStage(1);

    let { x, y } = Lib.getPositionsForToolForm(toolArea);
    toolForm.style.transform = `translate(${x}px, ${y}px)`;
  }

  static displayStageForm() {
    toolForm.innerHTML = `
      <form class="form-one">
        <h3 class="heading">Stage Properties</h3>
      </form>
    `;

    let { x, y } = Lib.getPositionsForToolForm(toolStage);
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
      y: header.getBoundingClientRect().bottom + 8,
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
      .right}px, ${header.getBoundingClientRect().bottom + 8}px`;
  }
}
