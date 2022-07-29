let sizeForm = document.getElementById("size-form");
let resizeForm = document.getElementById("resize-form");
let zoomScale = document.getElementById("zoom-scale");
let board = document.getElementById("board");
let toolNew = document.querySelector("[tool-button=new]");

sizeForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let width = sizeForm.width.value;
  let height = sizeForm.height.value;

  State.width = width;
  State.height = height;

  App.createBoard();
});

zoomScale.addEventListener("input", () => {
  State.boardTransform = { scale: zoomScale.value };
});

toolNew.addEventListener("click", () => {
  App.renew();
});

window.addEventListener("resize", () => Diagram.resizeBoard().center());
