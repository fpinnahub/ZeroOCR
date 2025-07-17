export function openModal(text) {
  document.getElementById("modalText").textContent = text;
  document.getElementById("textModal").style.display = "block";
}

export function closeModal() {
  document.getElementById("textModal").style.display = "none";
}
