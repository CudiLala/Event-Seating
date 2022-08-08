class Component {
  static areaEditor(areaObj) {
    let elem = Lib.parseHtml(`
      <form class="area-editor" autocomplete="off">
        <h3 class="heading">
          <span class="text">${areaObj.id}</span>
          <button id="rm-${areaObj.id}" type="button">${this.deleteIcon}</button>
        </h3>
        <div class="group linear">
          <div class="input-box">
            <input id="xi-${areaObj.id}" value="${areaObj.x}" type="number"/>
            <label for="xi-${areaObj.id}">X</label>
          </div>
          <div class="input-box">
            <input value="${areaObj.y}" id="yi-${areaObj.id}" type="number"/>
            <label for="yi-${areaObj.id}">Y</label>
          </div>
        </div>
        <div class="group linear">
          <div class="input-box">
            <input value="${areaObj.width}" id="wi-${areaObj.id}" type="number"/>
            <label for="wi-${areaObj.id}">Width</label>
          </div>
          <div class="input-box">
            <input id="li-${areaObj.id}" value="${areaObj.length}" type="number"/>
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
      </form>
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
        x: Number(xInput.value),
      });
    });
    yInput.addEventListener("input", () => {
      Board.updateSelectedAreaPosition({
        id: areaObj.id,
        y: Number(yInput.value),
      });
    });
    wInput.addEventListener("input", () => {
      Board.updateSelectedAreaSize({
        id: areaObj.id,
        width: Number(wInput.value),
      });
    });
    lInput.addEventListener("input", () => {
      Board.updateSelectedAreaSize({
        id: areaObj.id,
        length: Number(lInput.value),
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
    elem.querySelector("form").addEventListener("submit", (ev) => {
      ev.preventDefault();
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
        <div class="tool-form-container">
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
            <div style="display: flex">
              <div class="input-box">
                <input type="number" id="x-${areaProps.id}" name="x-${areaProps.id}" value="${areaProps.x}"/>
                <label for="x-${areaProps.id}">X</label>
              </div>
              <div class="input-box">
                <input type="number" id="y-${areaProps.id}" name="y-${areaProps.id}" value="${areaProps.y}"/>
                <label for="y-${areaProps.id}">Y</label>
              </div>
            </div>
          </div>
          <div class="input-container" style="margin-top: 8px">
            <p class="caption">Size</p>
            <p class="note">All values in meters</p>
            <div style="display: flex">
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

  static rowEditor(rowObj) {
    let elem = Lib.parseHtml(`
      <form class="area-editor" autocomplete="off">
        <h3 class="heading">
          <span class="text">${rowObj.id}</span>
          <button id="rm-${rowObj.id}" type="button">${this.deleteIcon}</button>
        </h3>
        <div class="group linear">
          <div class="input-box">
            <input id="xi-${rowObj.id}" value="${rowObj.x}" type="number"/>
            <label for="xi-${rowObj.id}">X</label>
          </div>
          <div class="input-box">
            <input value="${rowObj.y}" id="yi-${rowObj.id}" type="number"/>
            <label for="yi-${rowObj.id}">Y</label>
          </div>
        </div>
        <div class="group linear">
          <div class="input-box">
            <input value="${rowObj.width}" id="wi-${rowObj.id}" type="number"/>
            <label for="wi-${rowObj.id}">Width</label>
          </div>
          <div class="input-box">
            <input id="li-${rowObj.id}" value="${rowObj.length}" type="number"/>
            <label for="li-${rowObj.id}">Height</label>
          </div>
        </div>
        <div class="group">
          <div class="input-box">
            <input id="${rowObj.id}-name" name="${rowObj.id}-name" value="${rowObj.name}" />
            <label for="${rowObj.id}-name">Row Name/Ticket Type</label>
          </div>
        </div>
        <div class="group">
          <div class="input-box">
            <label>Row Type</label>
          </div>
          <div class="input-box linear">
            <input type="radio" name="row-type" id="standing" value="standing"/>
            <label for="standing">Standing</label>
          </div>
          <div class="input-box linear">
            <input type="radio" name="row-type" id="seat" value="seat"/>
            <label for="seat">Seat</label>
          </div>
          <div class="input-box linear">
            <input type="radio" name="row-type" id="table-seat" value="table-seat"/>
            <label for="table-seat">Table and Seat</label>
          </div>
        </div>
      </form>
    `);

    let xInput = elem.getElementById(`xi-${rowObj.id}`);
    let yInput = elem.getElementById(`yi-${rowObj.id}`);
    let wInput = elem.getElementById(`wi-${rowObj.id}`);
    let lInput = elem.getElementById(`li-${rowObj.id}`);
    let nameInput = elem.getElementById(`${rowObj.id}-name`);
    let rowTypeInputs = elem.querySelectorAll("input[name='row-type']");

    xInput.addEventListener("input", () => {
      Board.updateSelectedRowPosition({
        id: rowObj.id,
        x: Number(xInput.value),
      });
    });
    yInput.addEventListener("input", () => {
      Board.updateSelectedRowPosition({
        id: rowObj.id,
        y: Number(yInput.value),
      });
    });
    wInput.addEventListener("input", () => {
      Board.updateSelectedRowSize({
        id: rowObj.id,
        width: Number(wInput.value),
      });
    });
    lInput.addEventListener("input", () => {
      Board.updateSelectedRowSize({
        id: rowObj.id,
        length: Number(lInput.value),
      });
    });
    nameInput.addEventListener("input", () => {
      Board.updateSelectedRowName({
        id: rowObj.id,
        name: nameInput.value,
      });
    });
    elem.querySelector(`#rm-${rowObj.id}`).addEventListener("click", () => {
      Board.removeRow(rowObj.id);
    });
    elem.querySelector("form").addEventListener("submit", (ev) => {
      ev.preventDefault();
    });

    for (let rowTypeInput of rowTypeInputs) {
      rowTypeInput.addEventListener("click", () => {
        Board.updateSelectedRowType({
          id: rowObj.id,
          type: rowTypeInput.value,
        });
      });

      if (rowObj.type == rowTypeInput.value) {
        rowTypeInput.checked = true;
      }
    }

    return elem;
  }

  static rowToolForm(rowProps, setRowProps) {
    let elem = Lib.parseHtml(`
      <form class="form-one" autocomplete="off" style="width: 260px">
        <h3 class="heading">Row Properties</h3>
        <div class="tool-form-container">
          <div class="input-container" style="margin-top: 8px">
            <p class="caption">Meta</p>
            <p class="note">Row name should be the same as the ticket type</p>
            <div class="input-box">
              <input id="${rowProps.id}-name" name="${rowProps.id}-name" value="${rowProps.name}" />
              <label for="${rowProps.id}-name">Row Name/Ticket type</label>
            </div>
            <div class="input-box">
              <input id="ai-${rowProps.id}" name="ai-${rowProps.id}" value="${rowProps.id}" disabled/>
              <label for="ai-${rowProps.id}">Row ID</label>
            </div>
            <div class="input-box" style="margin-top: 4px">
              <label>Row Type</label>
            </div>
            <div class="input-box linear">
              <input type="radio" name="row-type" id="standing" value="standing"/>
              <label for="standing">Standing</label>
            </div>
            <div class="input-box linear">
              <input type="radio" name="row-type" id="seat" value="seat"/>
              <label for="seat">Seat</label>
            </div>
            <div class="input-box linear">
              <input type="radio" name="row-type" id="table-seat" value="table-seat"/>
              <label for="table-seat">Table and Seat</label>
            </div>
          </div>
          <div class="input-container" style="margin-top: 8px">
            <p class="caption">Position</p>
            <p class="note">All values in meters</p>
            <div style="display: flex">
              <div class="input-box">
                <input type="number" id="x-${rowProps.id}" name="x-${rowProps.id}" value="${rowProps.x}"/>
                <label for="x-${rowProps.id}">X</label>
              </div>
              <div class="input-box">
                <input type="number" id="y-${rowProps.id}" name="y-${rowProps.id}" value="${rowProps.y}"/>
                <label for="y-${rowProps.id}">Y</label>
              </div>
            </div>
          </div>
          <div class="input-container" style="margin-top: 8px">
            <p class="caption">Size</p>
            <p class="note">All values in meters</p>
            <div style="display: flex">
              <div class="input-box">
                <input type="number" id="w-${rowProps.id}" name="w-${rowProps.id}" value="${rowProps.width}"/>
                <label for="w-${rowProps.id}">Width</label>
              </div>
              <div class="input-box">
                <input type="number" id="l-${rowProps.id}" name="l-${rowProps.id}" value="${rowProps.length}"/>
                <label name="l-${rowProps.id}">Length</label>
              </div>
            </div>
          </div>
        </div>
        <div class="footer input-box linear end" style="margin-top: 8px">
          <button 
            class="action action-secondary" 
            type="button" 
            style="margin-right: 10px"
            id="${rowProps.id}-cancel"
          >
            Cancel
          </button>
          <button 
            class="action" 
            type="button" 
            id="${rowProps.id}-create"
          >
            Create
          </button>
        </div>
      </form>
    `);

    let nameInput = elem.getElementById(`${rowProps.id}-name`);
    let xInput = elem.getElementById(`x-${rowProps.id}`);
    let yInput = elem.getElementById(`y-${rowProps.id}`);
    let wInput = elem.getElementById(`w-${rowProps.id}`);
    let lInput = elem.getElementById(`l-${rowProps.id}`);
    let rowTypeInputs = elem.querySelectorAll("input[name='row-type']");

    elem.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
    });
    elem
      .getElementById(`${rowProps.id}-cancel`)
      .addEventListener("click", () => {
        Board.removeRow(rowProps.id);
        Lib.slideOutToolForm();
      });
    elem
      .getElementById(`${rowProps.id}-create`)
      .addEventListener("click", () => {
        Board.createRow(rowProps.id);
        Lib.slideOutToolForm();
      });

    nameInput.addEventListener("input", () => {
      setRowProps({ name: nameInput.value });
    });
    xInput.addEventListener("input", () => {
      setRowProps({ x: Number(xInput.value) });
    });
    yInput.addEventListener("input", () => {
      setRowProps({ y: Number(yInput.value) });
    });
    wInput.addEventListener("input", () => {
      setRowProps({ width: Number(wInput.value) });
    });
    lInput.addEventListener("input", () => {
      setRowProps({ length: Number(lInput.value) });
    });

    for (let rowTypeInput of rowTypeInputs) {
      rowTypeInput.addEventListener("click", () => {
        setRowProps({ type: rowTypeInput.value });
      });

      if (rowProps.type == rowTypeInput.value) {
        rowTypeInput.checked = true;
      }
    }

    return elem;
  }
}
