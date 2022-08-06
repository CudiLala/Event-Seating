board.addEventListener("click", () => {
  Lib.emptySideBar();
  Lib.unselectBoardComponents();
});

sizeForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let width = sizeForm.width.value;
  let length = sizeForm.length.value;

  Board.arenaSize = { width, length };
  State.display = "board";
});

toolNew.addEventListener("click", () => {
  App.renew();
  Lib.emptySideBar();
  Lib.slideOutToolForm();
});

toolArea.addEventListener("click", () => {
  if (State.display == "board") Lib.displayAreaForm();
});

toolToggleFullscreen.addEventListener("click", () => {
  if (!document.fullscreenEnabled) return;

  if (document.fullscreenElement) document.exitFullscreen();
  else root.requestFullscreen();
});

toolGenerateJson.addEventListener("click", () => {
  if (State.display == "board") {
    console.log("click generate json");
  }
});

zoomScaleUp.addEventListener("click", () => {
  State.scale += 0.01;
});
zoomScaleUp.addEventListener("mousedown", () => {
  Lib.startContinousScaleUpAfter500ms();
});
zoomScaleUp.addEventListener("mouseup", () => {
  Lib.stopContinousScale();
});
zoomScaleUp.addEventListener("mouseleave", () => {
  //implemented this due to chrome bugs
  Lib.stopContinousScale();
});

zoomScaleDown.addEventListener("click", () => {
  State.scale -= 0.01;
});
zoomScaleDown.addEventListener("mousedown", () => {
  Lib.startContinousScaleDownAfter500ms();
});
zoomScaleDown.addEventListener("mouseup", () => {
  Lib.stopContinousScale();
});
zoomScaleDown.addEventListener("mouseleave", () => {
  //implemented this due to chrome bugs
  Lib.stopContinousScale();
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement)
    toolToggleFullscreen.innerText = "Exit Fullscreen";
  else toolToggleFullscreen.innerText = "Enter Fullscreen";
});
