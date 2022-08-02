class Component {
  static areaToolFormLayout({ child = "", buttons = [] }) {
    let elem = Lib.parseHtml(`
      <form class="form-one" autocomplete="off">
        <h3 class="heading">Area Properties</h3>
        <div class="child-parent"></div>
        <div class="button-insertions footer input-box linear end" style="margin-top: 8px">
        </div>
      </form>
    `);

    elem.querySelector(".child-parent").append(child);
    elem.querySelector(".button-insertions").append(...buttons);
    elem.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    return elem;
  }

  static areaToolFormNameSection({ id, state, setAreaName }) {
    let elem = Lib.parseHtml(`
      <p class="note">Name should be unique</p>
      <div class="input-container">
        <div class="input-box">
          <input id="${id}" name="${id}" value="${state.areaProps.name}" style="width: 240px"/>
          <label for="${id}">Name</label>
        </div>
      </div>
    `);

    let nameInput = elem.querySelector(`#${id}`);

    nameInput.addEventListener("input", () => {
      setAreaName(nameInput.value);
    });

    return elem;
  }

  static areaToolFormPositionSection({ id, state, setAreaProps }) {
    let elem = Lib.parseHtml(`
      <p class="note">All values in meters</p>
      <div class="input-container">
        <p class="caption">Position</p>
        <div class="input-box">
          <input type="number" id="x-${id}" name="x-${id}" value="${state.areaProps.x}"/>
          <label for="x-${id}">X</label>
        </div>
        <div class="input-box">
          <input type="number" id="y-${id}" name="y-${id}" value="${state.areaProps.y}"/>
          <label for="y-${id}">Y</label>
        </div>
      </div>
    `);

    let xInput = elem.querySelector(`#x-${id}`);
    let yInput = elem.querySelector(`#y-${id}`);

    xInput.addEventListener("input", () => {
      setAreaProps({ x: xInput.value });
    });
    yInput.addEventListener("input", () => {
      setAreaProps({ y: yInput.value });
    });

    return elem;
  }

  static areaToolFormSizeSection({ id, state, setAreaProps }) {
    let elem = Lib.parseHtml(`
      <p class="note">All values in meters</p>
      <div class="input-container">
        <p class="caption">Size</p>
        <div class="input-box">
          <input type="number" id="w-${id}" name="w-${id}" value="${state.areaProps.width}"/>
          <label for="w-${id}">Width</label>
        </div>
        <div class="input-box">
          <input type="number" id="l-${id}" name="l-${id}" value="${state.areaProps.length}"/>
          <label name="l-${id}">Length</label>
        </div>
      </div>
    `);

    let wInput = elem.querySelector(`#w-${id}`);
    let lInput = elem.querySelector(`#l-${id}`);

    wInput.addEventListener("input", () => {
      setAreaProps({ width: wInput.value });
    });
    lInput.addEventListener("input", () => {
      setAreaProps({ length: lInput.value });
    });

    return elem;
  }

  static ToolFormBackButton({ state, setStage }) {
    let elem = Lib.parseHtml(`
      <button 
        class="action action-secondary" 
        type="button" 
        style="margin-right: 10px"
      >
        Back
      </button>
    `);

    elem.querySelector("button").addEventListener("click", () => {
      setStage(state.stage - 1);
    });

    return elem;
  }

  static ToolFormCancelButton(name) {
    let elem = Lib.parseHtml(`
      <button 
        class="action action-secondary" 
        type="button" 
        style="margin-right: 10px"
      >
        Cancel
      </button>
    `);

    elem.querySelector("button").addEventListener("click", () => {
      Board.removeAreaEdit(name);
      Lib.slideOutToolForm();
    });

    return elem;
  }

  static ToolFormCreateButton(name) {
    let elem = Lib.parseHtml(`
      <button 
        class="action" 
        type="button" 
      >
        Create
      </button>
    `);

    elem.querySelector("button").addEventListener("click", () => {
      Board.createArea(name);
      Lib.slideOutToolForm();
    });

    return elem;
  }

  static ToolFormNextButton({ state, setStage }) {
    let elem = Lib.parseHtml(`
      <button 
        class="action" 
        type="button" 
      >
        Next
      </button>
    `);

    elem.querySelector("button").addEventListener("click", () => {
      setStage(state.stage + 1);
    });

    return elem;
  }
}
