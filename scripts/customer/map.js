class Map {
  static #store = {
    size: { width: 0, length: 0 },
    content: {},
  };
  static #numRow = 0;

  static addEventListeners() {
    board.querySelectorAll("[id^='seat']").forEach((seat) => {
      seat.addEventListener("click", (e) => {
        e.stopPropagation();
        Lib.moveSeatClipboard(seat);
      });
    });
    board.querySelectorAll("[id^='table']").forEach((table) => {
      table.addEventListener("click", (e) => {
        e.stopPropagation();
        Lib.moveSeatClipboard(table);
      });
    });
    board.querySelectorAll("[id^='stand']").forEach((stand) => {
      stand.addEventListener("click", (e) => {
        e.stopPropagation();
        Lib.moveSeatClipboard(stand);
      });
    });
  }

  static init() {
    let store = localStorage.getItem("board");
    if (store) this.#store = JSON.parse(store);

    this.draw();
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

  static zParse() {
    let bWidth = Number(this.#store.size.width);
    let bLength = Number(this.#store.size.length);
    let strokeWidth = 0.001 * ((bWidth + bLength) / 2);

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
        let text = Lib.getLetterFromNum(++Map.#numRow);

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
              style="cursor: pointer"
              name="seat-${text}-${j}"
              id="seat-${text}-${j}"
            />
          `);
        }

        result = result.concat(`
          <text x="${textX}" y="${textY}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
            ${text}
          </text>
        `);
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
        let text = Lib.getLetterFromNum(++Map.#numRow);

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
              name="table-${text}-T${j}"
              id="table-${text}-T${j}"
              style="cursor: pointer"
            />          
            <text x="${textX}" y="${textY}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
              T${j}
            </text>
          `);

          let numChairs = 0;

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
                  style="cursor: pointer"
                  name="table-seat-${text}-T${j}-${++numChairs}"
                  id="table-seat-${text}-T${j}-${numChairs}"
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
                  style="cursor: pointer"
                  name="table-seat-${text}-T${j}-${++numChairs}"
                  id="table-seat-${text}-T${j}-${numChairs}"
                />
              `);
            }

          if (chairPositions.includes("south"))
            for (
              let k = 1;
              k <= (tableWidth - chairSpacing) / (chairWidth + chairSpacing);
              k++
            ) {
              let tt = Math.floor(
                (tableWidth - chairSpacing) / (chairWidth + chairSpacing)
              );

              let surplus =
                tableWidth - chairSpacing - (chairWidth + chairSpacing) * tt;

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
                  style="cursor: pointer"
                  name="table-seat-${text}-T${j}-${
                ++numChairs + tt - 2 * k + 1
              }"
                  id="table-seat-${text}-T${j}-${numChairs + tt - 2 * k + 1}"
                />
              `);
            }

          if (chairPositions.includes("west"))
            for (
              let k = 1;
              k <= (tableLength - chairSpacing) / (chairWidth + chairSpacing);
              k++
            ) {
              let tt = Math.floor(
                (tableLength - chairSpacing) / (chairWidth + chairSpacing)
              );
              let surplus =
                tableLength - chairSpacing - (chairWidth + chairSpacing) * tt;

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
                  style="cursor: pointer"
                  name="table-seat-${text}-T${j}-${
                ++numChairs + tt - 2 * k + 1
              }"
                  id="table-seat-${text}-T${j}-${numChairs + tt - 2 * k + 1}"
                />
              `);
            }
        }
        result = result.concat(`
          <text x="${textX}" y="${textY}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
            ${text}
          </text>
        `);
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
        let color = "black";
        let objType = id.startsWith("Area") ? "Area" : "Row";
        let elemId =
          objType === "Area"
            ? `area-${id.replace(/\-\-\w+/g, "")}`
            : objType === "Row"
            ? `row-${id.replace(/\-\-\w+/g, "")}`
            : "";

        if (objType === "Area") {
          result = result.concat(
            `<g id="${elemId}" fill="transparent" tab-index="0">
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

            result = result.concat(`
            <g id="${elemId}" tab-index="0">
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

            result = result.concat(`
            <g id="${elemId}" tab-index="0">
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

            let textFS = bLength / 50;
            let textX = x + width / 2;
            let textY1 = y + rows / 2 - textFS / 2;
            let textY2 = y + rows / 2 + textFS / 2;
            let elemId = id.match(/\d+$/)?.[0];

            result = result.concat(`
            <g  style="cursor: pointer" tab-index="0">
              <rect 
                x="${x}"
                y="${y}"
                width="${width}"
                height="${rows}"
                fill="${Lib.getRowColorRgb(rowColor)}"
                stroke="${color}"
                stroke-width="${strokeWidth}"
                id="stand-${elemId}" 
                name="stand-${elemId}"
              />
              <text x="${textX}" y="${textY1}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
                Standing
              </text>
              <text x="${textX}" y="${textY2}" font-size="${textFS}" fill="${color}" text-anchor="middle" dominant-baseline="middle" style="font-family: monospace">
                Row Capacity: ${rows * rowCapacity}
              </text>
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

    Map.#numRow = 0;
    return result;
  }
}
