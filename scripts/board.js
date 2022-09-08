class Board {
  static #store = {
    size: { width: 0, length: 0 },
    content: {},
  };

  static #nextYPos = 0;
  static #numRow = 0;

  static addEventListeners() {
    board.querySelectorAll("[id^='area']").forEach((area) => {
      area.addEventListener("click", (e) => {
        e.stopPropagation();

        Lib.unselectBoardComponents();
        Lib.handleBoardComponentClick(area);
        Lib.handleAreaClick(area);
      });
    });

    board.querySelectorAll("[id^='row']").forEach((row) => {
      row.addEventListener("click", (e) => {
        e.stopPropagation();

        Lib.unselectBoardComponents();
        Lib.handleBoardComponentClick(row);
        Lib.handleRowClick(row);
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
    if (this.#store.content[`${id}--e`])
      this.#store.content[id] = JSON.parse(
        JSON.stringify(this.#store.content[`${id}--e`])
      );
    delete this.#store.content[`${id}--e`];

    this.store().draw();
  }

  static createRow(id) {
    if (this.#store.content[`${id}--e`])
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
    this.nextYPos = this.arenaSize.length / 50;

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

  static getBoardJson() {
    return this.#store;
  }

  static getRowById(rowId) {
    return (
      this.#store.content[rowId] ||
      this.#store.content[`${rowId}--e`] ||
      this.#store.content[`${rowId}--s`]
    );
  }

  static getUniqueAreaId(num = 1) {
    let result = `Area-${num}`;
    let ids = Object.keys(this.#store.content);

    if (ids.some((id) => id.includes(result)))
      result = this.getUniqueAreaId(num + 1);

    return result;
  }

  static getUniqueRowId() {
    let ids = Object.keys(this.#store.content);
    ids = ids.filter((id) => /Row-group-\d+/.test(id));

    if (ids.length === 0) return `Row-group-1`;

    let lastId = ids.sort(Lib.rowIdSortFn)[ids.length - 1];
    let lastNum = lastId.match(/\d+/)[0];

    return `Row-group-${Number(lastNum) + 1}`;
  }

  static init(map) {
    this.#store = map;

    this.store().draw();
    return this;
  }

  static set nextYPos(value) {
    value = Number(value);
    if (value > (9 * this.arenaSize.length) / 10 || !value) {
      this.#nextYPos = this.arenaSize.length / 50;
    } else this.#nextYPos = value;
  }
  static get nextYPos() {
    if (this.#nextYPos) return this.#nextYPos;
    this.nextYPos = this.arenaSize.length / 50;

    return this.#nextYPos;
  }

  static removeArea(id) {
    const item =
      this.#store.content[id] ||
      this.#store.content[`${id}--e`] ||
      this.#store.content[`${id}--s`];

    delete this.#store.content[id];
    delete this.#store.content[`${id}--e`];
    delete this.#store.content[`${id}--s`];

    if (item.y + item.length >= Board.nextYPos) Board.nextYPos = item.y;

    Lib.emptySideBar();
    this.store().draw();
  }

  static removeRow(id) {
    const item =
      this.#store.content[id] ||
      this.#store.content[`${id}--e`] ||
      this.#store.content[`${id}--s`];

    delete this.#store.content[id];
    delete this.#store.content[`${id}--e`];
    delete this.#store.content[`${id}--s`];

    if (
      (item.type == "seat" &&
        item.y + item.rows * item.rowLength >= Board.nextYPos) ||
      (item.type == "table-seat" &&
        item.y + item.rows * item.tableRowLength >= Board.nextYPos) ||
      (item.type == "standing" && item.y + item.rows >= Board.nextYPos)
    )
      Board.nextYPos = item.y;

    Lib.emptySideBar();
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

  static updateNewRowProps({ id, ...props }) {
    for (let prop in props) {
      if (!this.#store.content[`${id}--e`])
        this.#store.content[`${id}--e`] = {};

      this.#store.content[`${id}--e`][prop] = props[prop];
    }

    this.draw().store();
  }

  static updateSelectedAreaName({ id, name }) {
    if (!this.#store.content[`${id}--s`] || name === undefined) return;

    this.#store.content[`${id}--s`].name = name;
    this.draw().store();
  }

  static updateSelectedRowName({ id, name }) {
    if (!this.#store.content[`${id}--s`] || name === undefined) return;

    this.#store.content[`${id}--s`].name = name;
    this.draw().store();
  }

  static updateSelectedAreaPosition({ id, x, y }) {
    if (!this.#store.content[`${id}--s`]) return;

    if (x !== undefined) this.#store.content[`${id}--s`].x = x;
    if (y !== undefined) this.#store.content[`${id}--s`].y = y;

    this.draw().store();
  }

  static updateSelectedRowPosition({ id, x, y }) {
    if (!this.#store.content[`${id}--s`]) return;

    if (x !== undefined) this.#store.content[`${id}--s`].x = x;
    if (y !== undefined) this.#store.content[`${id}--s`].y = y;

    this.draw().store();
  }

  static updateSelectedAreaSize({ id, width, length }) {
    if (!this.#store.content[`${id}--s`]) return;

    if (width !== undefined) this.#store.content[`${id}--s`].width = width;
    if (length !== undefined) this.#store.content[`${id}--s`].length = length;

    this.draw().store();
  }

  static updateSelectedRowProps({ id, ...props }) {
    if (!this.#store.content[`${id}--s`]) return;

    for (let prop in props) {
      this.#store.content[`${id}--s`][prop] = props[prop];
    }

    this.draw().store();
  }

  static updateSelectedAreaType({ id, type }) {
    if (!this.#store.content[`${id}--s`] || type === undefined) return;

    this.#store.content[`${id}--s`].type = type;
    this.draw().store();
  }

  static updateSelectedRowType({ id, type }) {
    if (!this.#store.content[`${id}--s`] || type === undefined) return;

    this.#store.content[`${id}--s`].type = type;
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
    let bWidth = Number(this.#store.size.width);
    let bLength = Number(this.#store.size.length);
    let strokeWidth = 0.001 * ((bWidth + bLength) / 2);

    Board.nextYPos = 0;

    function addSeating({
      x,
      y,
      width,
      rows,
      rowLength,
      chairWidth,
      chairSpacing,
      color,
    }) {
      let result = "";

      for (let i = 1; i <= rows; i++) {
        let textFS = Math.min(bLength / 100, chairWidth * 1.2);
        let textX = x - textFS;
        let textY = y + ((2 * i - 1) * rowLength) / 2;

        result = result.concat(`
          <text x="${textX}" y="${textY}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
            ${Lib.getLetterFromNum(++Board.#numRow)}
          </text>
        `);
        for (let j = 1; j <= width / (chairWidth + chairSpacing); j++) {
          let surplus =
            width -
            (chairWidth + chairSpacing) *
              Math.floor(width / (chairWidth + chairSpacing));

          let cy = y + (i * rowLength + (i - 1) * rowLength) / 2;
          let cx =
            x +
            j * (chairWidth + chairSpacing) -
            (chairWidth + chairSpacing) / 2 +
            surplus / 2;

          let r = chairWidth / 2;
          let textFS = 1.5 * r;

          result = result.concat(`
            <text x="${cx}" y="${cy}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
              ${j}
            </text>
            <circle 
              cx="${cx}" 
              cy="${cy}" 
              r="${r}" 
              stroke="${color}" 
              fill="transparent"
              stroke-width="${strokeWidth}" 
            />
          `);
        }
      }

      return result;
    }

    function addTable({
      x: rX,
      y: rY,
      width,
      rows,
      tableRowLength: rowLength,
      tableLength,
      tableWidth,
      tableChairWidth: chairWidth,
      tableSpacing,
      tableChairSpacing: chairSpacing,
      tableChairPositions: chairPositions,
      tableVerticalRadius,
      tableHorizontalRadius,
      color,
    }) {
      let result = "";

      for (let i = 1; i <= rows; i++) {
        let textFS = Math.min(bLength / 75, chairWidth * 1.5);
        let textX = rX - textFS;
        let textY = rY + ((2 * i - 1) * rowLength) / 2;

        result = result.concat(`
          <text x="${textX}" y="${textY}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
            ${Lib.getLetterFromNum(++Board.#numRow)}
          </text>
        `);
        for (
          let j = 1;
          j <=
          (width + tableSpacing) / (tableWidth + 2 * chairWidth + tableSpacing);
          j++
        ) {
          let surplus =
            width +
            tableSpacing -
            (tableWidth + 2 * chairWidth + tableSpacing) *
              Math.floor(
                (width + tableSpacing) /
                  (tableWidth + 2 * chairWidth + tableSpacing)
              );

          let x =
            rX +
            (j - 1) * (tableWidth + 2 * chairWidth + tableSpacing) +
            chairWidth +
            surplus / 2;

          let y =
            rY +
            (i - 1) * rowLength +
            chairWidth +
            (rowLength - (tableLength + 2 * chairWidth)) / 2;

          let textX = x + tableWidth / 2;
          let textY = y + tableLength / 2;
          let textFS = Math.min(bLength / 75, tableLength / 2);

          result = result.concat(`
            <text x="${textX}" y="${textY}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
              T${j}
            </text>
            <rect 
              x="${x}"
              y="${y}"
              rx="${tableVerticalRadius}"
              ry="${tableHorizontalRadius}"
              width="${tableWidth}"
              height="${tableLength}"
              fill="transparent"
              stroke="${color}"
              stroke-width="${strokeWidth}"
            />          
          `);

          if (chairPositions.includes("north"))
            for (
              let k = 1;
              k <= (tableWidth - chairSpacing) / (chairWidth + chairSpacing);
              k++
            ) {
              let surplus =
                tableWidth -
                chairSpacing -
                (chairWidth + chairSpacing) *
                  Math.floor(
                    (tableWidth - chairSpacing) / (chairWidth + chairSpacing)
                  );

              let r = chairWidth / 2;

              let cx =
                x +
                ((2 * k - 1) * chairWidth) / 2 +
                k * chairSpacing +
                surplus / 2;

              let cy = y - r;

              result = result.concat(`
                <circle
                  cx="${cx}"
                  cy="${cy}"
                  r="${r}"
                  fill="transparent"
                  stroke="${color}"
                  stroke-width="${strokeWidth}"
                />
              `);
            }

          if (chairPositions.includes("south"))
            for (
              let k = 1;
              k <= (tableWidth - chairSpacing) / (chairWidth + chairSpacing);
              k++
            ) {
              let surplus =
                tableWidth -
                chairSpacing -
                (chairWidth + chairSpacing) *
                  Math.floor(
                    (tableWidth - chairSpacing) / (chairWidth + chairSpacing)
                  );

              let r = chairWidth / 2;

              let cx =
                x +
                ((2 * k - 1) * chairWidth) / 2 +
                k * chairSpacing +
                surplus / 2;

              let cy = y + tableLength + r;

              result = result.concat(`
                <circle
                  cx="${cx}"
                  cy="${cy}"
                  r="${r}"
                  fill="transparent"
                  stroke="${color}"
                  stroke-width="${strokeWidth}"
                />
              `);
            }

          if (chairPositions.includes("east"))
            for (
              let k = 1;
              k <= (tableLength - chairSpacing) / (chairWidth + chairSpacing);
              k++
            ) {
              let surplus =
                tableLength -
                chairSpacing -
                (chairWidth + chairSpacing) *
                  Math.floor(
                    (tableLength - chairSpacing) / (chairWidth + chairSpacing)
                  );

              let r = chairWidth / 2;
              let cx = x - r;

              let cy =
                y +
                ((2 * k - 1) * chairWidth) / 2 +
                k * chairSpacing +
                surplus / 2;

              result = result.concat(`
                <circle 
                  cx="${cx}"
                  cy="${cy}"
                  r="${r}"
                  fill="transparent"
                  stroke="${color}"
                  stroke-width="${strokeWidth}"
                />
              `);
            }

          if (chairPositions.includes("west"))
            for (
              let k = 1;
              k <= (tableLength - chairSpacing) / (chairWidth + chairSpacing);
              k++
            ) {
              let surplus =
                tableLength -
                chairSpacing -
                (chairWidth + chairSpacing) *
                  Math.floor(
                    (tableLength - chairSpacing) / (chairWidth + chairSpacing)
                  );

              let r = chairWidth / 2;
              let cx = x + tableWidth + r;

              let cy =
                y +
                ((2 * k - 1) * chairWidth) / 2 +
                k * chairSpacing +
                surplus / 2;

              result = result.concat(`
                <circle 
                  cx="${cx}"
                  cy="${cy}"
                  r="${r}"
                  fill="transparent"
                  stroke="${color}"
                  stroke-width="${strokeWidth}"
                />
              `);
            }
        }
      }

      return result;
    }

    function addContent(obj) {
      if (!obj.content) return "";

      let result = "";
      let objContentIds = Object.keys(obj.content).sort(Lib.rowIdSortFn);

      for (let id of objContentIds) {
        let { x, y, width, length, name, type } = obj.content[id];

        let textFS = Math.min(
          Math.max(length / 2, bLength / 150),
          bLength / 50
        );
        let textX = x + width / 2;
        let textY = y + length / 2;
        let color = id.endsWith("--e")
          ? "#00a929"
          : id.endsWith("--s")
          ? "#1760fd"
          : "black";
        let objType = id.startsWith("Area") ? "Area" : "Row";
        let elemId =
          objType === "Area"
            ? `area-${id.replace(/\-\-\w+/g, "")}`
            : objType === "Row"
            ? `row-${id.replace(/\-\-\w+/g, "")}`
            : "";

        if (objType === "Area") {
          Board.nextYPos = Math.max(Board.nextYPos, y + length);

          result = result.concat(
            `<g id="${elemId}" fill="transparent" style="cursor: pointer" tab-index="0">
              <text x="${textX}" y="${textY}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
                ${name}
              </text>
              <rect 
                x="${x}"
                y="${y}"
                width="${width}"
                height="${length}"
                fill="transparent"
                stroke="${color}"
                stroke-width="${strokeWidth}"
              />
            </g>`
          );
        } else if (objType === "Row") {
          if (type == "seat") {
            let { rows, rowLength, chairWidth, chairSpacing, rowColor } =
              obj.content[id];

            Board.nextYPos = Math.max(Board.nextYPos, y + rows * rowLength);

            result = result.concat(`
            <g id="${elemId}" style="cursor: pointer" tab-index="0">
              <rect 
                x="${x}"
                y="${y}"
                width="${width}"
                height="${rows * rowLength}"
                fill="${Lib.getRowColorRgb(rowColor)}"
                stroke="${color}"
                stroke-width="${strokeWidth}"
              />
              ${addSeating({
                x,
                y,
                width,
                rows,
                rowLength,
                chairWidth,
                chairSpacing,
                color,
              })} 
           </g>`);
          } else if (type == "table-seat") {
            let { rows, tableRowLength: rowLength, rowColor } = obj.content[id];

            Board.nextYPos = Math.max(Board.nextYPos, y + rows * rowLength);

            result = result.concat(`
            <g id="${elemId}" style="cursor: pointer" tab-index="0">
              <rect 
                x="${x}"
                y="${y}"
                width="${width}"
                height="${rows * rowLength}"
                fill="${Lib.getRowColorRgb(rowColor)}"
                stroke="${color}"
                stroke-width="${strokeWidth}"
              />
              ${addTable({ color, ...obj.content[id] })}
           </g>`);
          } else {
            let { rows, rowColor, rowCapacity } = obj.content[id];
            let tTextFS = bLength / 75;
            let tTextX = x - tTextFS;
            let tTextY = y + rows / 2;
            let tText = Lib.getLetterFromNum(++Board.#numRow);

            result = result.concat(`
              <text x="${tTextX}" y="${tTextY}" font-size="${tTextFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
                ${tText}
              </text>`);

            Board.nextYPos = Math.max(Board.nextYPos, y + rows);

            let textFS = bLength / 60;
            let textX = x + width / 2;
            let textY1 = y + rows / 2 - textFS / 2;
            let textY2 = y + rows / 2 + textFS / 2;

            result = result.concat(`
            <g id="${elemId}" style="cursor: pointer" tab-index="0">
              <text x="${textX}" y="${textY1}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
                Standing
              </text>
              <text x="${textX}" y="${textY2}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
                Row Capacity: ${rowCapacity}
              </text>
              <rect 
                x="${x}"
                y="${y}"
                width="${width}"
                height="${rows}"
                fill="${Lib.getRowColorRgb(rowColor)}"
                stroke="${color}"
                stroke-width="${strokeWidth}"
              />
            </g>
            `);
          }
        }
      }

      return result;
    }

    let result = `
      <g>
        <rect 
          x="0"
          y="0"
          width="${bWidth}"
          height="${bLength}"
          id="master"
          fill="white"
          stroke-width="${0 * ((bWidth + bLength) / 2)}"
        />
        ${addContent(this.#store)}
      </g>
    `;

    this.#numRow = 0;
    return result;
  }
}
