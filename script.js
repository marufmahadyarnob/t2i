const imageInput = document.getElementById("imageInput");
const textCode = document.getElementById("textCode");
const preview = document.getElementById("preview");
const qualitySlider = document.getElementById("qualitySlider");
const qualityValue = document.getElementById("qualityValue");
const charCount = document.getElementById("charCount");

const MAX_WIDTH = 600;

let originalCanvas = null; // store resized canvas

/* -----------------------------
   Update quality label
------------------------------ */
qualitySlider.addEventListener("input", () => {
  qualityValue.textContent = qualitySlider.value + "%";
  if (originalCanvas) {
    generateFromCanvas();
  }
});

/* -----------------------------
   Image Upload
------------------------------ */
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = () => img.src = reader.result;
  reader.readAsDataURL(file);

  img.onload = () => {
    const scale = Math.min(1, MAX_WIDTH / img.width);

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    originalCanvas = canvas;
    generateFromCanvas();
  };
});

/* -----------------------------
   Generate Base64 from Canvas
------------------------------ */
function generateFromCanvas() {
  const quality = qualitySlider.value / 100;
  const dataURL = originalCanvas.toDataURL("image/webp", quality);

  textCode.value = dataURL;
  preview.src = dataURL;
  charCount.textContent = dataURL.length;
}

/* -----------------------------
   Text → Image
------------------------------ */
function renderFromText() {
  const cleaned = textCode.value.replace(/\s+/g, "");
  if (!cleaned.includes("data:image")) {
    alert("Invalid image code!");
    return;
  }
  preview.src = cleaned;
  charCount.textContent = cleaned.length;
}

/* -----------------------------
   Live preview while typing
------------------------------ */
textCode.addEventListener("input", () => {
  const cleaned = textCode.value.replace(/\s+/g, "");
  charCount.textContent = cleaned.length;

  if (cleaned.includes("data:image")) {
    preview.src = cleaned;
  }
});

/* -----------------------------
   Save Image
------------------------------ */
function downloadImage() {
  if (!preview.src) {
    alert("No image to save!");
    return;
  }
  const a = document.createElement("a");
  a.href = preview.src;
  a.download = "image.webp";
  a.click();
}

/* -----------------------------
   Utilities
------------------------------ */
function copyAll() {
  textCode.select();
  document.execCommand("copy");
}

function selectAll() {
  textCode.select();
}

function clearAll() {
  textCode.value = "";
  preview.src = "";
  imageInput.value = "";
  charCount.textContent = 0;
  originalCanvas = null;
}
