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
  if (State.display == "board") displayAreaForm();
});

toolStage.addEventListener("click", () => {
  if (State.display == "board") displayStageForm();
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

window.addEventListener("resize", () => console.log("handle resize"));

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement)
    toolToggleFullscreen.innerText = "Exit Fullscreen";
  else toolToggleFullscreen.innerText = "Enter Fullscreen";
});
