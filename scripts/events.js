let sizeForm = document.getElementById("size-form");

sizeForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let width = sizeForm.width.value;
  let height = sizeForm.height.value;

  setArenaSize([width, height]);
  setDisplay("board");
});
