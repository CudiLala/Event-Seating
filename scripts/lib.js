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
    let areaProps = {};

    function setAreaProps(value) {
      for (let key in value) {
        areaProps[key] = value[key];
      }

      Board.updateNewAreaProps(areaProps);
    }

    setAreaProps({
      id: Board.getUniqueAreaId(),
      name: "",
      type: "block",
      x: Board.arenaSize.width / 50,
      y: Board.arenaSize.length / 50,
      width: Board.arenaSize.width / 10,
      length: Board.arenaSize.length / 10,
    });

    toolForm.innerHTML = "";
    toolForm.append(Component.areaToolForm(areaProps, setAreaProps));

    let { x, y } = Lib.getPositionsForToolForm(toolArea);
    toolForm.style.transform = `translate(${x}px, ${y}px)`;
  }

  static displayRowForm() {
    let rowProps = {};

    function setRowProps(value) {
      for (let key in value) {
        rowProps[key] = value[key];
      }
      Board.updateNewRowProps(rowProps);
    }

    setRowProps({
      id: Board.getUniqueRowId(),
      name: "",
      type: "seat",
      x: Board.arenaSize.width / 50,
      y: Board.arenaSize.length / 50,
      width: Board.arenaSize.width - Board.arenaSize.width / 25,
      // length: Board.arenaSize.length / 20,
      length: 2,
    });

    toolForm.innerHTML = "";
    toolForm.append(Component.rowToolForm(rowProps, setRowProps));

    let { x, y } = Lib.getPositionsForToolForm(toolRow);
    toolForm.style.transform = `translate(${x}px, ${y}px)`;
  }

  static emptySideBar() {
    sideBarBody.innerHTML = "<p class='empty-text'><span>Sidebar</span></p>";
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

  static handleBoardComponentClick(area) {
    // console.log("clicked a board component");
  }

  static handleAreaClick(area) {
    let areaObj = Board.getAreaById(area.id.slice(5));
    if (!areaObj) return;

    Board.select(area.id.slice(5));
    areaObj.id = area.id.slice(5);
    this.showAreaEditor(areaObj);
  }

  static handleRowClick(row) {
    let rowObj = Board.getRowById(row.id.slice(4));
    if (!rowObj) return;

    Board.select(row.id.slice(4));
    rowObj.id = row.id.slice(4);
    this.showRowEditor(rowObj);
  }

  static parseHtml(htmlstring) {
    let div = document.createElement("div");
    let fragement = new DocumentFragment();

    div.innerHTML = htmlstring;
    fragement.append(...div.children);

    return fragement;
  }

  static showAreaEditor(areaObj) {
    sideBarBody.innerHTML = "";
    sideBarBody.append(Component.areaEditor(areaObj));
  }

  static showRowEditor(rowObj) {
    sideBarBody.innerHTML = "";
    sideBarBody.append(Component.rowEditor(rowObj));
  }

  static slideOutToolForm() {
    toolForm.style.transform = `translate(${
      -toolForm.getBoundingClientRect().width - 5
    }px, ${header.getBoundingClientRect().bottom + 4}px`;
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

  static unselectBoardComponents() {
    board.querySelectorAll("[id^='area']").forEach((area) => {
      Board.unselect(area.id.slice(5));
    });
    board.querySelectorAll("[id^='row']").forEach((row) => {
      Board.unselect(row.id.slice(4));
    });
  }
}
