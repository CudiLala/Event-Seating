class State {
  static globalParmas = {};
  static #store = {
    display: "form",
  };

  static clear() {
    localStorage.removeItem("state");
    this.#store = {
      display: "form",
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

    if (value == "board") Lib.enableElements(toolNew, toolArea, toolRow);
    else Lib.disableElements(toolNew, toolArea, toolRow);

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

  static get scale() {
    return this.globalParmas.scale || 1;
  }

  static set scale(value) {
    value = Number(value);
    if (value < 1) return;
    if (value > 5) return;

    if (this.globalParmas.scale) {
      board.style.transform = `scale(${value})`;
      this.scroll = {
        x: (board.clientWidth * (value - this.globalParmas.scale)) / 2,
        y: (board.clientHeight * (value - this.globalParmas.scale)) / 2,
      };
    } else {
      this.scroll = { x: 0, y: 0 };
      board.style.transform = `scale(1)`;
    }

    this.globalParmas.scale = value;
  }

  static set scroll({ x, y }) {
    boardBox.scrollBy({ left: x, top: y, behavior: "auto" });
  }

  static store() {
    localStorage.setItem("state", JSON.stringify(this.#store));

    return this;
  }
}
