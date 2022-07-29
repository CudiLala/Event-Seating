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

window.addEventListener("resize", () => console.log("handle resize"));
