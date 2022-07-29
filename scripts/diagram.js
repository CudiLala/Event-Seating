class Diagram {
  static svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  static isInitialized = false;

  static resizeBoard() {
    let aspectRatio = State.width / State.height;

    if (board.clientWidth >= board.clientHeight * aspectRatio) {
      State.boardWidth = board.clientHeight * aspectRatio;
      State.boardHeight = board.clientHeight;
    }
    //this statement in the condition below is the negation of the statement in the condition above
    //also the same as writing else
    else if (board.clientHeight > board.clientWidth / aspectRatio) {
      State.boardWidth = board.clientWidth;
      State.boardHeight = board.clientWidth / aspectRatio;
    }

    App.addAttributes(this.svg, {
      width: `${State.boardWidth}px`,
      height: `${State.boardHeight}px`,
    });

    return this;
  }

  static center() {
    State.boardTransform = {
      // translateX: `calc(50% - ${State.boardWidth / 2}px)`,
      // translateY: `calc(50% - ${State.boardHeight / 2}px)`,
      translateX: "-50%",
      translateY: "-50%",
    };
    return this;
  }

  static init() {
    this.resizeBoard().center();
    board.append(this.svg);

    this.isInitialized = true;
    return this;
  }

  static denit() {
    this.isInitialized = false;
    return this;
  }
}
