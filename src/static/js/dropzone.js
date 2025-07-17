let selectedFile = null;

export function initDropZone() {
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");

  dropArea.addEventListener("click", () => fileInput.click());

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("hover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("hover");
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("hover");
    const file = e.dataTransfer.files[0];
    if (file) {
      selectedFile = file;
      dropArea.textContent = `File selezionato: ${file.name}`;
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      selectedFile = fileInput.files[0];
      dropArea.textContent = `File selezionato: ${selectedFile.name}`;
    }
  });
}

export function getSelectedFile() {
  return selectedFile;
}
