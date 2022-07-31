class State {
  static #store = {
    display: "form",
    scale: 1,
    scroll: { x: 0, y: 0 },
    fullscreen: false,
  };

  static clear() {
    localStorage.removeItem("state");
    this.#store = {
      display: "form",
      scale: 1,
      scroll: { x: 0, y: 0 },
      fullscreen: false,
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

    if (value == "board") enableElements(toolNew, toolArea, toolStage);
    else disableElements(toolNew, toolArea, toolStage);

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

  static set scale(value) {
    value = Number(value);
    if (value < 1) throw "Value cannot be less than 1";

    board.style.transform = `scale(${value})`;
    boardBox.scrollBy({ top: value, left: value });

    zoomScale.value = value;

    this.#store.scale = value;
    this.store();
  }

  static set scroll({ x, y }) {
    if (x < 0 || y < 0) throw "Cannot scroll beyond 0";

    this.#store.scroll = { x, y };
    this.store();
  }

  static set fullscreen(value) {
    this.#store.fullscreen = value;
    this.store();
  }

  static store() {
    localStorage.setItem("state", JSON.stringify(this.#store));

    return this;
  }
}
