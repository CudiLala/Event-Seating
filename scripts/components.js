class Component {
  static areaEditor(areaObj) {
    let elem = Lib.parseHtml(`
      <div class="area-editor">
        <h3 class="heading">
          <span class="text">${areaObj.id}</span>
          <button id="rm-${areaObj.id}">${this.deleteIcon}</button>
        </h3>
        <div class="group linear">
          <div class="input-box">
            <input id="xi-${areaObj.id}" value="${areaObj.x}" class="tiny" type="number"/>
            <label for="xi-${areaObj.id}">X</label>
          </div>
          <div class="input-box">
            <input value="${areaObj.y}" id="yi-${areaObj.id}" class="tiny" type="number"/>
            <label for="yi-${areaObj.id}">Y</label>
          </div>
        </div>
        <div class="group linear">
          <div class="input-box">
            <input value="${areaObj.width}" id="wi-${areaObj.id}" class="tiny" type="number"/>
            <label for="wi-${areaObj.id}">Width</label>
          </div>
          <div class="input-box">
            <input id="li-${areaObj.id}" value="${areaObj.length}" class="tiny" type="number"/>
            <label for="li-${areaObj.id}">Height</label>
          </div>
        </div>
        <div class="group">
          <div class="input-box">
            <input id="${areaObj.id}-name" name="${areaObj.id}-name" value="${areaObj.name}" />
            <label for="${areaObj.id}-name">Area Name</label>
          </div>
        </div>
        <div class="group">
          <div class="input-box">
            <label>Area Type</label>
          </div>
          <div class="input-box linear">
            <input type="radio" name="area-type" id="stage" value="stage"/>
            <label for="stage">Stage</label>
          </div>
          <div class="input-box linear">
            <input type="radio" name="area-type" id="bar" value="bar"/>
            <label for="bar">Bar</label>
          </div>
          <div class="input-box linear">
            <input type="radio" name="area-type" id="block" value="block"/>
            <label for="block">Block</label>
          </div>
        </div>
      </div>
    `);

    let xInput = elem.getElementById(`xi-${areaObj.id}`);
    let yInput = elem.getElementById(`yi-${areaObj.id}`);
    let wInput = elem.getElementById(`wi-${areaObj.id}`);
    let lInput = elem.getElementById(`li-${areaObj.id}`);
    let nameInput = elem.getElementById(`${areaObj.id}-name`);
    let areaTypeInputs = elem.querySelectorAll("input[name='area-type']");

    xInput.addEventListener("input", () => {
      Board.updateSelectedAreaPosition({
        id: areaObj.id,
        x: xInput.value,
      });
    });
    yInput.addEventListener("input", () => {
      Board.updateSelectedAreaPosition({
        id: areaObj.id,
        y: yInput.value,
      });
    });
    wInput.addEventListener("input", () => {
      Board.updateSelectedAreaSize({
        id: areaObj.id,
        width: wInput.value,
      });
    });
    lInput.addEventListener("input", () => {
      Board.updateSelectedAreaSize({
        id: areaObj.id,
        length: lInput.value,
      });
    });
    nameInput.addEventListener("input", () => {
      Board.updateSelectedAreaName({
        id: areaObj.id,
        name: nameInput.value,
      });
    });
    elem.querySelector(`#rm-${areaObj.id}`).addEventListener("click", () => {
      Board.removeArea(areaObj.id);
    });

    for (let areaTypeInput of areaTypeInputs) {
      areaTypeInput.addEventListener("click", () => {
        Board.updateSelectedAreaType({
          id: areaObj.id,
          type: areaTypeInput.value,
        });
      });

      if (areaObj.type == areaTypeInput.value) {
        areaTypeInput.checked = true;
      }
    }

    return elem;
  }

  static areaToolForm(areaProps, setAreaProps) {
    let elem = Lib.parseHtml(`
      <form class="form-one" autocomplete="off" style="width: 260px">
        <h3 class="heading">Area Properties</h3>
        <div class="area-tool-form-container">
          <div class="input-container" style="margin-top: 8px">
            <p class="caption">Meta</p>
            <div class="input-box">
              <input id="${areaProps.id}-name" name="${areaProps.id}-name" value="${areaProps.name}" />
              <label for="${areaProps.id}-name">Area Name</label>
            </div>
            <div class="input-box">
              <input id="ai-${areaProps.id}" name="ai-${areaProps.id}" value="${areaProps.id}" disabled/>
              <label for="ai-${areaProps.id}">Area ID</label>
            </div>
            <div class="input-box" style="margin-top: 4px">
              <label>Area Type</label>
            </div>
            <div class="input-box linear">
              <input type="radio" name="area-type" id="stage" value="stage"/>
              <label for="stage">Stage</label>
            </div>
            <div class="input-box linear">
              <input type="radio" name="area-type" id="bar" value="bar"/>
              <label for="bar">Bar</label>
            </div>
            <div class="input-box linear">
              <input type="radio" name="area-type" id="block" value="block"/>
              <label for="block">Block</label>
            </div>
          </div>
          <div class="input-container" style="margin-top: 8px">
            <p class="caption">Position</p>
            <p class="note">All values in meters</p>
            <div class="input-box">
              <input type="number" id="x-${areaProps.id}" name="x-${areaProps.id}" value="${areaProps.x}"/>
              <label for="x-${areaProps.id}">X</label>
            </div>
            <div class="input-box">
              <input type="number" id="y-${areaProps.id}" name="y-${areaProps.id}" value="${areaProps.y}"/>
              <label for="y-${areaProps.id}">Y</label>
            </div>
          </div>
          <div class="input-container" style="margin-top: 8px">
            <p class="caption">Size</p>
            <p class="note">All values in meters</p>
            <div class="input-box">
              <input type="number" id="w-${areaProps.id}" name="w-${areaProps.id}" value="${areaProps.width}"/>
              <label for="w-${areaProps.id}">Width</label>
            </div>
            <div class="input-box">
              <input type="number" id="l-${areaProps.id}" name="l-${areaProps.id}" value="${areaProps.length}"/>
              <label name="l-${areaProps.id}">Length</label>
            </div>
          </div>
        </div>
        <div class="footer input-box linear end" style="margin-top: 8px">
          <button 
            class="action action-secondary" 
            type="button" 
            style="margin-right: 10px"
            id="${areaProps.id}-cancel"
          >
            Cancel
          </button>
          <button 
            class="action" 
            type="button" 
            id="${areaProps.id}-create"
          >
            Create
          </button>
        </div>
      </form>
    `);

    let nameInput = elem.querySelector(`#${areaProps.id}-name`);
    let xInput = elem.querySelector(`#x-${areaProps.id}`);
    let yInput = elem.querySelector(`#y-${areaProps.id}`);
    let wInput = elem.querySelector(`#w-${areaProps.id}`);
    let lInput = elem.querySelector(`#l-${areaProps.id}`);
    let areaTypeInputs = elem.querySelectorAll("input[name='area-type']");

    elem.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
    });
    elem
      .querySelector(`#${areaProps.id}-cancel`)
      .addEventListener("click", () => {
        Board.removeArea(areaProps.id);
        Lib.slideOutToolForm();
      });
    elem
      .querySelector(`#${areaProps.id}-create`)
      .addEventListener("click", () => {
        Board.createArea(areaProps.id);
        Lib.slideOutToolForm();
      });

    nameInput.addEventListener("input", () => {
      setAreaProps({ name: nameInput.value });
    });
    xInput.addEventListener("input", () => {
      setAreaProps({ x: Number(xInput.value) });
    });
    yInput.addEventListener("input", () => {
      setAreaProps({ y: Number(yInput.value) });
    });
    wInput.addEventListener("input", () => {
      setAreaProps({ width: Number(wInput.value) });
    });
    lInput.addEventListener("input", () => {
      setAreaProps({ length: Number(lInput.value) });
    });

    for (let areaTypeInput of areaTypeInputs) {
      areaTypeInput.addEventListener("click", () => {
        setAreaProps({ type: areaTypeInput.value });
      });

      if (areaProps.type == areaTypeInput.value) {
        areaTypeInput.checked = true;
      }
    }

    return elem;
  }

  static deleteIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
      <path 
        d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" 
        fill="none" 
        stroke="currentColor" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="32"/>
      <path 
        stroke="currentColor" 
        stroke-linecap="round" 
        stroke-miterlimit="10" 
        stroke-width="32" 
        d="M80 112h352"/>
      <path 
        d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" 
        fill="none" 
        stroke="currentColor" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="32"/>
    </svg>`;
}
