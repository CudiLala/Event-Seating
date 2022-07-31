class Board {
  static #store = {
    size: { width: 0, length: 0 },
  };

  static set arenaSize({ width, length }) {
    if (width < 1 || length < 1)
      throw "Width and length should be greater than or equal to one";

    this.#store.size = { width, length };
    this.store();
    this.draw();
  }

  static clear() {
    localStorage.removeItem("board");
    this.#store = {
      size: { width: 0, length: 0 },
    };

    this.init();
    return this;
  }

  static draw() {
    let width = Number(this.#store.size.width);
    let length = Number(this.#store.size.length);

    board.setAttribute("viewBox", `0 0 ${width} ${length}`);

    board.innerHTML = `
      <g>
        <rect 
          x="${0.02 * width}"
          y="${0.02 * length}"
          width="${0.96 * width}"
          height="${0.96 * length}"
          fill="transparent"
          stroke="black"
          stroke-width="${0.0015 * ((width + length) / 2)}"
        />
      </g>
    `;
  }

  static init() {
    let store = localStorage.getItem("board");
    if (store) this.#store = JSON.parse(store);

    this.draw();
    return this;
  }

  static store() {
    localStorage.setItem("board", JSON.stringify(this.#store));
    return this;
  }
}
