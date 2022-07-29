class State {
  static #width = 5;
  static #height = 5;
  static #display = "form";
  static #boardTransform = {};
  static boardWidth = 0;
  static boardHeight = 0;

  static get width() {
    return this.#width;
  }

  static set width(value) {
    value = Number(value);

    if (value == NaN) throw "Value given to width is not a number";
    if (value < 1) throw "Width is too small";

    this.#width = value;
    this.store();
  }

  static get height() {
    return this.#height;
  }

  static set height(value) {
    value = Number(value);

    if (value == NaN) throw "Value given to height is not a number";
    if (value < 1) throw "Height is too small";

    this.#height = value;
    this.store();
  }

  static get display() {
    return this.#display;
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

    this.#display = value;
    this.store();
  }

  static store() {
    localStorage.setItem(
      "state",
      JSON.stringify({
        display: this.#display,
        width: this.#width,
        height: this.#height,
        boardTransform: this.#boardTransform,
      })
    );

    return this;
  }

  static set boardTransform(value) {
    if (typeof value != "object")
      throw "the board transform should be an object";

    this.store();
  }

  static setBoardTransform(transformFn) {
    this.boardTransform = transformFn(this.#boardTransform);
  }

  static clear() {
    localStorage.removeItem("state");
    App.init();

    return this;
  }
}
