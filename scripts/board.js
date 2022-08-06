class Board {
  static #store = {
    size: { width: 0, length: 0 },
    content: {},
  };

  static globalParams = { allowGrag: [] };

  static addEventListeners() {
    board.querySelectorAll("[id^='area']").forEach((area) => {
      area.addEventListener("click", (e) => {
        e.stopPropagation();

        Lib.unselectBoardComponents();
        Lib.handleBoardComponentClick(area);
        Lib.handleAreaClick(area);
      });
    });
  }

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

    this.addEventListeners();

    return this;
  }

  static getAreaById(areaId) {
    return (
      this.#store.content[areaId] ||
      this.#store.content[`${areaId}--e`] ||
      this.#store.content[`${areaId}--s`]
    );
  }

  static getUniqueAreaId(num = 1) {
    let result = `Area-${num}`;
    let ids = Object.keys(this.#store.content);

    if (ids.some((id) => id.includes(result)))
      result = this.getUniqueAreaId(num + 1);

    return result;
  }

  static init() {
    let store = localStorage.getItem("board");
    if (store) this.#store = JSON.parse(store);

    this.store().draw();
    return this;
  }

  static removeNewArea(id) {
    delete this.#store.content[`${id}--e`];

    this.store().draw();
  }

  static select(id) {
    let object = this.#store.content[id] || this.#store.content[`${id}--e`];

    if (object) {
      id = id.replace(/\-\-w+/g);

      this.#store.content[`${id}--s`] = JSON.parse(JSON.stringify(object));
      delete this.#store.content[id];
      delete this.#store.content[`${id}--e`];
    }

    this.draw().store();
  }

  static store() {
    localStorage.setItem("board", JSON.stringify(this.#store));
    return this;
  }

  static updateNewAreaProps({ id, ...props }) {
    for (let prop in props) {
      if (!this.#store.content[`${id}--e`])
        this.#store.content[`${id}--e`] = {};

      this.#store.content[`${id}--e`][prop] = props[prop];
    }

    this.draw().store();
  }

  static updateSelectedAreaPosition({ id, x, y }) {
    if (x !== undefined) this.#store.content[`${id}--s`].x = x;
    if (y !== undefined) this.#store.content[`${id}--s`].y = y;

    this.draw().store();
  }

  static updateSelectedAreaSize({ id, width, length }) {
    if (width !== undefined) this.#store.content[`${id}--s`].width = width;
    if (length !== undefined) this.#store.content[`${id}--s`].length = length;

    this.draw().store();
  }

  static unselect(id) {
    if (!id) return;

    if (this.#store.content[`${id}--s`]) {
      this.#store.content[id] = JSON.parse(
        JSON.stringify(this.#store.content[`${id}--s`])
      );
      delete this.#store.content[`${id}--s`];
    }

    this.draw().store();
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
          `<g id="area-${id.replace(
            /\-\-\w+/g,
            ""
          )}" style="cursor: pointer" tab-index="0">
            <rect 
              x="${obj.content[id].x}"
              y="${obj.content[id].y}"
              width="${obj.content[id].width}"
              height="${obj.content[id].length}"
              fill="transparent"
              stroke="${
                id.endsWith("--e")
                  ? "#00a929"
                  : id.endsWith("--s")
                  ? "#1760fd"
                  : "black"
              }"
              stroke-width="${strokeWidth}"
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
          id="master"
          fill="white"
          stroke-width="${0 * ((width + length) / 2)}"
        />
        ${addContent(this.#store)}
      </g>
    `;

    return result;
  }
}
