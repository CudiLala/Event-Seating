sizeForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let width = sizeForm.width.value;
  let height = sizeForm.height.value;

  State.width = width;
  State.height = height;

  App.createBoard();
});

toolNew.addEventListener("click", () => {
  App.renew();
});

toolArea.addEventListener("click", () => {
  if (Board.isInitialized) displayAreaForm();
});
toolStage.addEventListener("click", () => {
  if (Board.isInitialized) displayStageForm();
});
toolGenerateJson.addEventListener("click", () => {
  if (Board.isInitialized) {
    console.log("click generate json");
  }
});

board.addEventListener("click", () => {
  SVGComponent.deselectAll();
});

window.addEventListener("resize", () => console.log("handle resize"));
