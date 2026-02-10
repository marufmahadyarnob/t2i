const imageInput = document.getElementById("imageInput");
const textCode = document.getElementById("textCode");
const preview = document.getElementById("preview");

// Image ➜ Text
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

// Text ➜ Image (Preview)
function renderFromText() {
  const value = textCode.value.trim();
  if (!value.startsWith("data:image")) {
    alert("Invalid image code!");
    return;
  }
  preview.src = value;
}

// Auto preview when pasting text
textCode.addEventListener("input", () => {
  const value = textCode.value.trim();
  if (value.startsWith("data:image")) {
    preview.src = value;
  }
});

// Save image
function downloadImage() {
  if (!preview.src) {
    alert("No image to save!");
    return;
  }
  const a = document.createElement("a");
  a.href = preview.src;
  a.download = "image.png";
  a.click();
}

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
