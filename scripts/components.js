class Component {
  static areaEditor(areaObj) {
    let elem = Lib.parseHtml(`
      <div class="area-editor">
        <h3 class="heading">Area Properties</h3>
        <div class="group linear">
          <div class="input-box linear">
            <input id="xi-${areaObj.id}" value="${areaObj.x}" class="tiny" type="number"/>
            <label for="xi-${areaObj.id}">X</label>
          </div>
          <div class="input-box linear" >
            <input value="${areaObj.y}" id="yi-${areaObj.id}" class="tiny" type="number"/>
            <label for="yi-${areaObj.id}">Y</label>
          </div>
        </div>
        <div class="group">
          <div class="input-box linear">
            <input value="${areaObj.width}" id="wi-${areaObj.id}" class="tiny" type="number"/>
            <label for="wi-${areaObj.id}">Width</label>
          </div>
          <div class="input-box linear" style="margin-top: 8px">
            <input id="li-${areaObj.id}" value="${areaObj.length}" class="tiny" type="number"/>
            <label for="li-${areaObj.id}">Height</label>
          </div>
        </div>
      </div>
    `);

    let xInput = elem.getElementById(`xi-${areaObj.id}`);
    let yInput = elem.getElementById(`yi-${areaObj.id}`);
    let wInput = elem.getElementById(`wi-${areaObj.id}`);
    let lInput = elem.getElementById(`li-${areaObj.id}`);

    xInput.addEventListener("input", () => {
      Board.updateAreaPositionSelect({
        id: areaObj.id,
        x: xInput.value,
      });
    });
    yInput.addEventListener("input", () => {
      Board.updateAreaPositionSelect({
        id: areaObj.id,
        y: yInput.value,
      });
    });
    wInput.addEventListener("input", () => {
      Board.updateAreaSizeSelect({
        id: areaObj.id,
        width: wInput.value,
      });
    });
    lInput.addEventListener("input", () => {
      Board.updateAreaSizeSelect({
        id: areaObj.id,
        length: lInput.value,
      });
    });
    return elem;
  }

  static areaToolFormLayout({ child = "", buttons = [] }) {
    let elem = Lib.parseHtml(`
      <form class="form-one" autocomplete="off" style="width: 260px">
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

  static areaToolFormNameSection({ id, state, setAreaProps }) {
    let elem = Lib.parseHtml(`
      <div class="input-container">
        <div class="input-box">
          <input id="${id}" name="${id}" value="${state.areaProps.name}" />
          <label for="${id}">Name</label>
        </div>
      </div>
    `);

    let nameInput = elem.querySelector(`#${id}`);

    nameInput.addEventListener("input", () => {
      setAreaProps({ name: nameInput.value });
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

  static areaToolSectionOne({ id, state, setAreaId, setAreaProps }) {
    let elem = Lib.parseHtml(`
      <p class="note" style="text-align: left">Name should be the same as the ticket type</p>
    `);
    elem.append(
      Component.areaToolFormNameSection({ id, state, setAreaProps }),
      Component.areaToolFormRowIdSection({ id, state, setAreaId }),
      Component.areaToolFormTypeSection({ id, state, setAreaProps })
    );

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

  static areaToolFormRowIdSection({ id, state, setAreaId }) {
    let elem = Lib.parseHtml(`
      <div class="input-container">
        <div class="input-box">
          <input id="ai-${id}" name="ai-${id}" value="${state.areaProps.id}" />
          <label for="ai-${id}">Area Id</label>
        </div>
      </div>
    `);

    let areaIdInput = elem.querySelector(`#ai-${id}`);

    areaIdInput.addEventListener("input", () => {
      setAreaId(areaIdInput.value);
    });

    return elem;
  }

  static areaToolFormTypeSection({ id, state, setAreaProps }) {
    let elem = Lib.parseHtml(`
    <div class="input-container">
      <div class="input-box">
        <label>Area Type</label>
      </div>
      <div class="input-box linear">
        <input type="radio" name="area-type" id="stage" value="stage"/>
        <label for="stage">Stage</label>
      </div>
      <div class="input-box linear">
        <input type="radio" name="area-type" id="standing" value="standing"/>
        <label for="standing">Standing</label>
      </div>
      <div class="input-box linear">
        <input type="radio" name="area-type" id="seat" value="seat"/>
        <label for="seat">Seat</label>
      </div>
      <div class="input-box linear">
        <input type="radio" name="area-type" id="table-seat" value="table-seat"/>
        <label for="table-seat">Table & Seat</label>
      </div>
      <div class="input-box linear">
        <input type="radio" name="area-type" id="block" value="block"/>
        <label for="block">Block</label>
      </div>
    </div>
    `);

    let inputs = elem.querySelectorAll("input[type='radio']");

    for (let input of inputs) {
      input.addEventListener("click", () => {
        setAreaProps({ type: input.value });
      });

      if (state.areaProps.type == input.value) {
        input.checked = true;
      }
    }

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

  static ToolFormCancelButton({ state }) {
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
      Board.removeAreaEdit(state.areaProps.id);
      Lib.slideOutToolForm();
    });

    return elem;
  }

  static ToolFormCreateButton({ state }) {
    let elem = Lib.parseHtml(`
      <button 
        class="action" 
        type="button" 
      >
        Create
      </button>
    `);

    elem.querySelector("button").addEventListener("click", () => {
      Board.createArea(state.areaProps.id);
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
