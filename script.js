const imageInput = document.getElementById("imageInput");
const textCode = document.getElementById("textCode");
const preview = document.getElementById("preview");

/* ---------------------------
   Image ➜ Text
---------------------------- */
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    textCode.value = reader.result;
    preview.src = reader.result;
  };
  reader.readAsDataURL(file);
});

/* ---------------------------
   Text ➜ Image (Preview)
---------------------------- */
function renderFromText() {
  const raw = textCode.value;
  const cleaned = raw.replace(/\s+/g, "");

  if (!cleaned.includes("data:image")) {
    alert("Invalid image code!");
    return;
  }

  preview.src = cleaned;
}

/* ---------------------------
   Auto preview on paste/type
---------------------------- */
textCode.addEventListener("input", () => {
  const cleaned = textCode.value.replace(/\s+/g, "");
  if (cleaned.includes("data:image")) {
    preview.src = cleaned;
  }
});

/* ---------------------------
   Save Image
---------------------------- */
function downloadImage() {
  if (!preview.src || !preview.src.includes("data:image")) {
    alert("No image to save!");
    return;
  }

  const a = document.createElement("a");
  a.href = preview.src;
  a.download = "image.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ---------------------------
   Utility buttons
---------------------------- */
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
}
