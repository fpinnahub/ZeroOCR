import { showProgress, hideProgress, setCursorBusy, setStatusMessage } from './ui.js';
import { openModal } from './modal.js';

export function uploadFile(selectedFile) {
  const output = document.getElementById("output");
  const previewImage = document.getElementById("previewImage");
  const previewLabel = document.getElementById("previewLabel");
  const extractBtn = document.getElementById("extractBtn");

  if (!selectedFile) {
    alert("Seleziona o trascina un file prima di inviare.");
    return;
  }

  extractBtn.disabled = true;
  setCursorBusy(true);
  setStatusMessage("Uploading...");

  output.value = "Estrazione in corso...";
  previewImage.style.display = "none";
  previewLabel.style.display = "none";

  showProgress(10);

  const formData = new FormData();
  formData.append("file", selectedFile);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:8000/extract-text/", true);

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      showProgress(percent / 2);
    }
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 2) {
      setStatusMessage("Processing...");
    }

    if (xhr.readyState === 4) {
      hideProgress();
      extractBtn.disabled = false;
      setCursorBusy(false);
      setStatusMessage("");

      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        output.value = data.text;
        setStatusMessage("Done!");

        if (data.preview_image) {
          previewImage.src = "data:image/png;base64," + data.preview_image;
        } else if (selectedFile.type.startsWith("image/")) {
          previewImage.src = URL.createObjectURL(selectedFile);
        }

        if (previewImage.src) {
          previewImage.style.display = "block";
          previewLabel.style.display = "block";
        }

      } else {
        const error = JSON.parse(xhr.responseText);
        output.value = "Errore: " + (error.detail || "Errore generico.");
        setStatusMessage("Errore");
      }
    }
  };

  xhr.send(formData);
  showProgress(75);
}
