import { initDropZone, getSelectedFile } from './dropzone.js';
import { uploadFile } from './uploader.js';
import { openModal } from './modal.js';


document.addEventListener("DOMContentLoaded", () => {
  initDropZone();

  const extractBtn = document.getElementById("extractBtn");
  extractBtn.addEventListener("click", () => {
    const selectedFile = getSelectedFile();
    uploadFile(selectedFile);
  });

  const closeBtn = document.getElementById("modalCloseBtn");
  closeBtn.addEventListener("click", () => {
    import('./modal.js').then(mod => mod.closeModal());
  });

  const openBtn = document.getElementById("modalOpenBtn");
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      const text = document.getElementById("output").value || "";
      openModal(text);
    });
  }
});
