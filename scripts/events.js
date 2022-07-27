let sizeForm = document.getElementById("size-form");
let resizeForm = document.getElementById("resize-form");
let zoomScale = document.getElementById("zoom-scale");

sizeForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let width = sizeForm.width.value;
  let height = sizeForm.height.value;

  setArenaSize([width, height]);
  setDisplay("board");
});

zoomScale.addEventListener("input", () => {
  setScale(zoomScale.value);
  // console.log(svg.getAttribute("width"), svg.getAttribute("viewBox"));
});

resizeForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let width = resizeForm.width.value;
  let height = resizeForm.height.value;

  console.log(width, height);

  setArenaSize([width, height]);
});
