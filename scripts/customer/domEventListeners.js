board.addEventListener("click", (e) => {
  Lib.removeSeatClipboard();
});
boardBox.addEventListener("scroll", () => {
  Lib.removeSeatClipboard();
});

zoomScaleUp?.addEventListener("click", () => {
  State.scale += 0.04;
  Lib.removeSeatClipboard();
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
  Lib.removeSeatClipboard();
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
