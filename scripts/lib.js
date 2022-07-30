/**
 * @param  {...HTMLButtonElement|HTMLInputElement} elems
 */
function disableElements(...elems) {
  for (let elem of elems) {
    elem.disabled = true;
  }
}

function displayAreaForm() {
  function handleCancel(e) {
    e.stopPropagation();
    toolForm.style.transform = `translate(${-toolForm.getBoundingClientRect()
      .right}px, ${getPositionsForToolForm(toolArea).y}px)`;
  }

  toolForm.innerHTML = `
    <form class="form-one">
      <h3 class="heading">Area Properties</h3>
      <p class="note">All values in meters</p>
      <div class="input-container">
        <p class="caption">Position</p>
        <div style="display: flex">
          <div class="input-box linear">
            <input id="area-x" name="area-x" value="0" type="number" class="tiny"/>
            <label for="area-x">X</label>
          </div>
          <div class="input-box linear">
            <input id="area-y" name="area-y" value="0" type="number" class="tiny"/>
            <label for="area-y">Y</label>
          </div>
        </div>
      </div>
      <div class="input-container">
        <p class="caption">Size</p>
        <div style="display: flex">
          <div class="input-box linear">
            <input id="area-width" name="area-width" value="10" type="number" class="tiny"/>
            <label for="area-width">Width</label>
          </div>
          <div class="input-box linear">
            <input id="area-height" name="area-height" value="10" type="number" class="tiny"/>
            <label for="area-height">Height</label>
          </div>
        </div>
      </div>
      <div class="footer input-box linear end" style="margin-top: 8px">
        <button class="action-secondary action" type="button" style="margin-right: 10px" id="cancel">
          Cancel
        </button>
        <button class="action">Next</button>
      </div>
    </form>
  `;

  document.getElementById("cancel").addEventListener("click", handleCancel);

  let { x, y } = getPositionsForToolForm(toolArea);
  toolForm.style.transform = `translate(${x}px, ${y}px)`;
}

function displayTableForm() {
  toolForm.innerHTML = `
  <form class="form-one">
    <h3 class="heading">Table Properties</h3>
  </form>
  `;

  let { x, y } = getPositionsForToolForm(toolTable);
  toolForm.style.transform = `translate(${x}px, ${y}px)`;
}

function displayChairForm() {
  toolForm.innerHTML = `
  <form class="form-one">
    <h3 class="heading">Chair Properties</h3>
  </form>
  `;

  let { x, y } = getPositionsForToolForm(toolChair);
  toolForm.style.transform = `translate(${x}px, ${y}px)`;
}

function displayStandForm() {
  toolForm.innerHTML = `
  <form class="form-one">
    <h3 class="heading">Stand Properties</h3>
  </form>
  `;

  let { x, y } = getPositionsForToolForm(toolStand);
  toolForm.style.transform = `translate(${x}px, ${y}px)`;
}

function displayStageForm() {
  toolForm.innerHTML = `
  <form class="form-one">
    <h3 class="heading">Stage Properties</h3>
  </form>
  `;

  let { x, y } = getPositionsForToolForm(toolStage);
  toolForm.style.transform = `translate(${x}px, ${y}px)`;
}

function displayBarForm() {
  toolForm.innerHTML = `
  <form class="form-one">
    <h3 class="heading">Bar Properties</h3>
  </form>
  `;

  let { x, y } = getPositionsForToolForm(toolBar);
  toolForm.style.transform = `translate(${x}px, ${y}px)`;
}

/**
 * @param  {...HTMLButtonElement|HTMLInputElement} elems
 */
function enableElements(...elems) {
  for (let elem of elems) {
    elem.disabled = false;
  }
}

/**
 * @param {HTMLElement} relativeElem
 * @returns {{x: number, y: number}}
 */
function getPositionsForToolForm(relativeElem) {
  return {
    x: relativeElem.getBoundingClientRect().left + 2,
    y: header.getBoundingClientRect().bottom + 8,
  };
}
