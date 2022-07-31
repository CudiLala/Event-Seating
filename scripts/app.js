class App {
  static init() {
    State.init();
    Board.init();
  }

  static renew() {
    State.clear();
    Board.clear();
  }
}
