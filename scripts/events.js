let sizeForm = document.getElementById("size-form");
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
