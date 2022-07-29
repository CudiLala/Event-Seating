class Board {
  static isInitialized = false;

  static init() {
    board.setAttribute("viewBox", `0 0 ${State.width} ${State.height}`);

    board.append(new Component("g", "arena group").html());
    Component.get("arena group")
      .html()
      .append(
        new Component("rect", "arena border")
          .addAttributes({
            x: `${0.02 * State.width}`,
            y: `${0.02 * State.height}`,
            width: `${0.96 * State.width}`,
            height: `${0.96 * State.height}`,
            fill: "#fadfaf",
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
