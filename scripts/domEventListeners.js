board?.addEventListener("click", () => {
  Lib.emptySideBar();
  Lib.unselectBoardComponents();
});

startForm?.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  let name = startForm.name.value;
  let width = startForm.width.value;
  let length = startForm.length.value;

  let { pvId, mapId } = await Lib.createSeatingMapInDB(name, width, length);
  window.location.href = `?pvId=${pvId}&mapId=${mapId}`;
});

toolNew?.addEventListener("click", () => {
  App.renew();
  Lib.emptySideBar();
  Lib.slideOutToolForm();
});

toolArea?.addEventListener("click", () => {
  if (State.display == "board") Lib.displayAreaForm();
});

toolRow?.addEventListener("click", () => {
  if (State.display == "board") Lib.displayRowForm();
});

toolToggleFullscreen?.addEventListener("click", () => {
  if (!document.fullscreenEnabled) return;

  if (document.fullscreenElement) document.exitFullscreen();
  else root.requestFullscreen();
});

toolSaveJson?.addEventListener("click", () => {
  if (State.display == "board") {
    Lib.startSavingProgress();
    Lib.saveSeatingMapToDB();
    Lib.endSavingProgress();
  }
});

zoomScaleUp?.addEventListener("click", () => {
  State.scale += 0.04;
});
zoomScaleUp?.addEventListener("mousedown", () => {
  Lib.startContinousScaleUpAfter500ms();
});
zoomScaleUp?.addEventListener("mouseup", () => {
  Lib.stopContinousScale();
});
zoomScaleUp?.addEventListener("mouseleave", () => {
  //implemented this due to chrome bugs
  Lib.stopContinousScale();
});

zoomScaleDown?.addEventListener("click", () => {
  State.scale -= 0.04;
});
zoomScaleDown?.addEventListener("mousedown", () => {
  Lib.startContinousScaleDownAfter500ms();
});
zoomScaleDown?.addEventListener("mouseup", () => {
  Lib.stopContinousScale();
});
zoomScaleDown?.addEventListener("mouseleave", () => {
  //implemented this due to chrome bugs
  Lib.stopContinousScale();
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement)
    toolToggleFullscreen.innerText = "Exit Fullscreen";
  else toolToggleFullscreen.innerText = "Enter Fullscreen";
});
