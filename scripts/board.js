class Board {
  static isInitialized = false;

  static init() {
    board.setAttribute("viewBox", `0 0 ${State.width} ${State.height}`);

    board.append(new SVGComponent("g", "arena group").html());
    SVGComponent.get("arena group")
      .html()
      .append(
        new SVGComponent("rect", "arena border")
          .addAttributes({
            x: `${0.02 * State.width}`,
            y: `${0.02 * State.height}`,
            rx: `${0.02 * ((State.width + State.height) / 2)}`,
            ry: `${0.02 * ((State.width + State.height) / 2)}`,
            width: `${0.96 * State.width}`,
            height: `${0.96 * State.height}`,
            fill: "transparent",
            stroke: "black",
            "stroke-width": `${0.001 * ((State.width + State.height) / 2)}`,
          })
          .onselect(() => {
            sideBarBody.innerHTML = `
            <form class="resizeForm" onsubmit="console.log('submited')">
              <input type="number" />
              <input type="number"/>
              <input type="submit" />
            </form>`;
          })
          .html()
      );

    this.isInitialized = true;
    return this;
  }

  static denit() {
    this.isInitialized = false;
    return this;
  }
}
