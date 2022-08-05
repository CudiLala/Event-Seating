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
    /*
      area.addEventListener("mousedown", (e) => {
        this.globalParams.allowGrag.push({
          id: area.id,
          x: e.offsetX,
          y: e.offsetY,
        });
      });
      document.addEventListener("mouseup", (e) => {
        this.globalParams.allowGrag = this.globalParams.allowGrag.filter(
          (areaObj) => {
            let res = areaObj.id == area.id;

            if (res) {
              let rect = area.querySelector("rect");
              let x = rect.getAttribute("x");
              let y = rect.getAttribute("y");

              Board.updateAreaPosition({ id: area.id.slice(5), x, y });
            }

            return !res;
          }
        );
      });
      document.addEventListener("mousemove", (e) => {
        let areaIndex = this.globalParams.allowGrag.findIndex(
          (elem) => elem.id == area.id
        );
        if (areaIndex > -1) {
          let areaObj = this.globalParams.allowGrag[areaIndex];
          let boardWidth = Number(this.#store.size.width);
          let boardLength = Number(this.#store.size.length);
          let rect = area.querySelector("rect");

          rect.setAttribute(
            "x",
            Number(rect.getAttribute("x")) +
              ((e.offsetX - areaObj.x) * boardWidth) / window.innerWidth
          );
          rect.setAttribute(
            "y",
            Number(rect.getAttribute("y")) +
              ((e.offsetY - areaObj.y) * boardLength) / window.innerHeight
          );

          areaObj.x = e.offsetX;
          areaObj.y = e.offsetY;
        }
      });*/
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
    return this.#store.content[areaId];
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
    this.#store.content[`${id}--e`] = {
      name,
      x: x,
      y: y,
      width: width,
      length: length,
      ...others,
    };

    this.draw().store();
  }

  static updateAreaPositionSelect({ id, x, y }) {
    if (x !== undefined) this.#store.content[`${id}--s`].x = x;
    if (y !== undefined) this.#store.content[`${id}--s`].y = y;

    this.draw().store();
  }

  static updateAreaSizeSelect({ id, width, length }) {
    if (width !== undefined) this.#store.content[`${id}--s`].width = width;
    if (length !== undefined) this.#store.content[`${id}--s`].length = length;

    this.draw().store();
  }

  static select(id) {
    if (this.#store.content[id] && !id.endsWith("--s")) {
      this.#store.content[`${id}--s`] = JSON.parse(
        JSON.stringify(this.#store.content[id])
      );
      console.log(id);

      delete this.#store.content[id];
    }

    this.draw().store();
  }

  static unselect(id) {
    if (this.#store.content[id] && id.endsWith("--s")) {
      this.#store.content[`${id.slice(0, id.length - 3)}`] = JSON.parse(
        JSON.stringify(this.#store.content[id])
      );
      delete this.#store.content[id];
    }

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
          `<g id="area-${id}" style="cursor: pointer" tab-index="0">
            <rect 
              x="${obj.content[id].x}"
              y="${obj.content[id].y}"
              width="${obj.content[id].width}"
              height="${obj.content[id].length}"
              fill="transparent"
              stroke="${
                id.endsWith("--e")
                  ? "green"
                  : id.endsWith("--s")
                  ? "blue"
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
