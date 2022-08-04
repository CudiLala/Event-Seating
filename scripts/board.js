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
    this.store().draw();
  }

  static createArea(id) {
    this.#store.content[id] = JSON.parse(
      JSON.stringify(this.#store.content[`${id}--e`])
    );
    delete this.#store.content[`${id}--e`];

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

  static getUniqueAreaId(num = 1) {
    let result = `Area ${num}`;

    if (Object.keys(this.#store.content).includes(result))
      result = this.getUniqueAreaId(num + 1);

    return result;
  }

  static init() {
    let store = localStorage.getItem("board");
    if (store) this.#store = JSON.parse(store);

    this.store().draw();
    return this;
  }

  static removeAreaEdit(id) {
    delete this.#store.content[`${id}--e`];

    this.store().draw();
  }

  static updateAreaIdEdit(oldId, newId) {
    if (oldId === undefined || newId === undefined) return false;

    this.#store.content[`${newId}--e`] = JSON.parse(
      JSON.stringify(this.#store.content[`${oldId}--e`])
    ) /* deep copy */;
    delete this.#store.content[`${oldId}--e`];

    this.draw().store();
    return true;
  }

  static updateAreaEdit({ id, name, x, y, width, length, ...others }) {
    let boardWidth = Number(this.#store.size.width);
    let boardLength = Number(this.#store.size.length);

    this.#store.content[`${id}--e`] = {
      name,
      x: x / boardWidth,
      y: y / boardLength,
      width: width / boardWidth,
      length: length / boardLength,
      ...others,
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

      for (let id in obj.content) {
        result = result.concat(
          `<g>
            <rect 
              id="${id}"
              x="${obj.content[id].x * width}"
              y="${obj.content[id].y * length}"
              width="${obj.content[id].width * width}"
              height="${obj.content[id].length * length}"
              fill="transparent"
              stroke="${id.endsWith("--e") ? "green" : "black"}"
              stroke-width="${strokeWidth}"
              style="cursor: grab"
            />
            ${addContent(obj.content[id])}
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
          fill="white"
          stroke-width="${0 * ((width + length) / 2)}"
        />
        ${addContent(this.#store)}
      </g>
    `;

    return result;
  }
}
