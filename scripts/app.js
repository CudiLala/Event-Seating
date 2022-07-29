class App {
  static createBoard() {
    State.display = "board";
    Diagram.init();
  }

  static addAttributes(elem, attirbutes) {
    for (let key in attirbutes) {
      elem.setAttribute(key, attirbutes[key]);
    }
  }

  static init() {
    let state = localStorage.getItem("state");
    if (state) {
      state = JSON.parse(state);
    } else {
      state = {
        display: "form",
        width: 100,
        height: 100,
        boardTransform: {
          scale: 1,
          translateX: 0,
          translateY: 0,
        },
      };
    }

    for (let key in state) {
      State[key] = state[key];
    }
  }

  static renew() {
    State.clear();
    App.init();
    Diagram.denit();
  }
}
