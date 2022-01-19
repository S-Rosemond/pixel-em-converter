const history = document.getElementById("history");
const mainForm = document.getElementById("main-form");
const pixelInput = document.getElementById("pixel-input");
const emInput = document.getElementById("em-input");
const baseInput = document.getElementById("base-input");
const formGroupInputs = document.querySelectorAll(
  ".form-group > input[type='text']"
);
let errorOutput = document.getElementById("error-output");

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

formGroupInputs.forEach((elements) => {
  elements.addEventListener("focus", (e) => {
    e.target.parentNode.children[0].classList.remove("blur-label");
    e.target.parentNode.children[0].classList.add("focus-label");
  });

  elements.addEventListener("blur", (e) => {
    if (e.target.value.length < 1) {
      e.target.parentNode.children[0].classList.remove("focus-label");
      e.target.parentNode.children[0].classList.add("blur-label");
    }
  });
});

function conversion(input, base, type) {
  let result;

  if (isNaN(Number(input))) return;
  if (input.length < 1) input = 0;
  if (base.length < 1) base = 16;

  switch (type) {
    case "px":
      result = Number(input * base);
      break;
    case "em":
      result = Number(input / base);
      break;
  }

  return result;
}

pixelInput.addEventListener("focus", (e) => {
  emInput.value = "";
  errorOutput.innerText = "";
});
emInput.addEventListener("focus", (e) => {
  pixelInput.value = "";
  errorOutput.innerText = "";
});

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let em;
  let px;
  const type = pixelInput.value ? "em" : "px";

  switch (type) {
    case "em":
      em = conversion(pixelInput.value, baseInput.value, type);
      px = Number(pixelInput.value);
      break;
    case "px":
      px = conversion(emInput.value, baseInput.value, type);
      em = Number(emInput.value);
      break;
  }

  if (isNaN(em) || isNaN(px)) {
    errorOutput.innerText = "Please enter a valid number";
    return;
  }

  history.innerHTML += `<li>${px}px = ${em}em</li>`;

  // mainForm.reset();
});

// Dev only
if (window.location.reload) {
  baseInput.value = "";
  mainForm.reset();
}
