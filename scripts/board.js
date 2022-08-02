class Board {
  static #store = {
    size: { width: 0, length: 0 },
    content: {},
  };

  static get arenaSize() {
    return this.#store.size;
  }

  static set arenaSize({ width, length }) {
    width = Number(width);
    length = Number(length);

    if (width < 1 || length < 1)
      throw "Width and length should be greater than or equal to one";

    this.#store.size = { width, length };
    this.store();
    this.draw();
  }

  static createArea(name) {
    this.#store.content[name] = JSON.parse(
      JSON.stringify(this.#store.content[`${name}--e`])
    );
    delete this.#store.content[`${name}--e`];

    this.store().draw();
  }

  static clear() {
    localStorage.removeItem("board");
    this.#store = {
      size: { width: 0, length: 0 },
      content: {},
    };

    this.init();
    return this;
  }

  static draw() {
    let width = Number(this.#store.size.width);
    let length = Number(this.#store.size.length);

    board.setAttribute(
      "viewBox",
      `${-0.01 * width} ${-0.01 * length} ${1.01 * width} ${1.01 * length}`
    );

    let parsed = this.zParse();
    board.innerHTML = parsed;

    return this;
  }

  static getUniqueAreaName(num = 1) {
    let result = `Area ${num}`;

    if (Object.keys(this.#store.content).includes(result))
      result = this.getUniqueAreaName(num + 1);

    return result;
  }

  static init() {
    let store = localStorage.getItem("board");
    if (store) this.#store = JSON.parse(store);

    this.store().draw();
    return this;
  }

  static removeAreaEdit(name) {
    delete this.#store.content[`${name}--e`];

    this.store().draw();
  }

  static updateAreaNameEdit(oldName, newName) {
    if (!oldName || !newName) return false;

    this.#store.content[`${newName}--e`] = JSON.parse(
      JSON.stringify(this.#store.content[`${oldName}--e`])
    ) /* deep copy */;
    delete this.#store.content[`${oldName}--e`];

    this.draw().store();
    return true;
  }

  static updateAreaEdit({ name, x, y, width, length }) {
    let boardWidth = Number(this.#store.size.width);
    let boardLength = Number(this.#store.size.length);

    this.#store.content[`${name}--e`] = {
      x: x / boardWidth,
      y: y / boardLength,
      width: width / boardWidth,
      length: length / boardLength,
    };

    this.draw().store();
  }

  static store() {
    localStorage.setItem("board", JSON.stringify(this.#store));
    return this;
  }

  static zParse() {
    let width = Number(this.#store.size.width);
    let length = Number(this.#store.size.length);
    let strokeWidth = 0.001 * ((width + length) / 2);

    function addContent(obj) {
      if (!obj.content) return "";

      let result = "";

      for (let name in obj.content) {
        result = result.concat(
          `<g>
            <rect 
              id="${name}"
              x="${obj.content[name].x * width}"
              y="${obj.content[name].y * length}"
              width="${obj.content[name].width * width}"
              height="${obj.content[name].length * length}"
              fill="transparent"
              stroke="${name.endsWith("--e") ? "green" : "black"}"
              stroke-width="${strokeWidth}"
            />
            ${addContent(obj.content[name])}
          </g>`
        );
      }

      return result;
    }

    let result = `
      <g>
        <rect 
          x="0"
          y="0"
          width="${width}"
          height="${length}"
          fill="transparent"
          stroke="black"
          stroke-width="${0.0015 * ((width + length) / 2)}"
        />
        ${addContent(this.#store)}
      </g>
    `;

    return result;
  }
}
