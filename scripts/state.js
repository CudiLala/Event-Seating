class State {
  static #store = {
    display: "form",
    scale: 1,
  };

  static clear() {
    localStorage.removeItem("state");
    this.#store = {
      display: "form",
      scale: 1,
    };

    this.init();
    return this;
  }

  static get display() {
    return this.#store.display;
  }

  static set display(value) {
    if (!["form", "board"].includes(value)) throw "Unrecognized state display";

    let displayMap = {
      form: "form-container",
      board: "board-container",
    };

    for (let key in displayMap) {
      if (key == value) {
        document.getElementById(displayMap[key]).style.display = "flex";
      } else {
        document.getElementById(displayMap[key]).style.display = "none";
      }
    }

    if (value == "board") Lib.enableElements(toolNew, toolArea);
    else Lib.disableElements(toolNew, toolArea);

    this.#store.display = value;
    this.store();
  }

  static init() {
    let state = localStorage.getItem("state");
    if (state) this.#store = JSON.parse(state);

    for (let key in this.#store) {
      this[key] = this.#store[key];
    }
  }

  static updateZoomValue(value) {
    //implemented promise due to chrome bugs
    return new Promise((resolve, reject) => {
      try {
        zoomValue.innerText = `${Math.floor(value * 100)}%`;
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  static get scale() {
    return this.#store.scale;
  }

  static set scale(value) {
    value = Number(value);
    if (value < 1) return;
    if (value > 5) return;

    board.style.transform = `scale(${value})`;

    this.scroll = {
      x: (boardBox.clientWidth * (value - 1)) / 2,
      y: (boardBox.clientHeight * (value - 1)) / 2,
    };

    this.#store.scale = value;
    this.store();
    this.updateZoomValue(value);
  }

  static set scroll({ x, y }) {
    if (x < 0 || y < 0) throw "Cannot scroll beyond 0";

    boardBox.scroll(x, y);
  }

  static store() {
    localStorage.setItem("state", JSON.stringify(this.#store));

    return this;
  }
}
