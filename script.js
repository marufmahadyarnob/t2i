const imageInput = document.getElementById("imageInput");
const textCode = document.getElementById("textCode");
const preview = document.getElementById("preview");

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

function textToImage() {
  const value = textCode.value.trim();
  if (!value.startsWith("data:image")) {
    alert("Invalid image code!");
    return;
  }
  preview.src = value;
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
