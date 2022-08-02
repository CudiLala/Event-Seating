sizeForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let width = sizeForm.width.value;
  let length = sizeForm.length.value;

  Board.arenaSize = { width, length };
  State.display = "board";
});

toolNew.addEventListener("click", () => {
  App.renew();
});

toolArea.addEventListener("click", () => {
  if (State.display == "board") Lib.displayAreaForm();
});

toolStage.addEventListener("click", () => {
  if (State.display == "board") Lib.displayStageForm();
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

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement)
    toolToggleFullscreen.innerText = "Exit Fullscreen";
  else toolToggleFullscreen.innerText = "Enter Fullscreen";
});

zoomScale.addEventListener("input", () => {
  State.scale = zoomScale.value;
});
