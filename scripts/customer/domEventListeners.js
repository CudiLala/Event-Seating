board?.addEventListener("click", () => {});

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
