export function showProgress(percent) {
  const progressBar = document.getElementById("progressBar");
  const progressInner = document.getElementById("progressInner");
  progressBar.style.display = "block";
  progressInner.style.width = percent + "%";
}

export function hideProgress() {
  const progressBar = document.getElementById("progressBar");
  const progressInner = document.getElementById("progressInner");
  progressBar.style.display = "none";
  progressInner.style.width = "0%";
}

export function setCursorBusy(isBusy) {
  document.body.style.cursor = isBusy ? "progress" : "default";
}

export function setStatusMessage(message) {
  document.getElementById("statusMessage").textContent = message || "";
}
