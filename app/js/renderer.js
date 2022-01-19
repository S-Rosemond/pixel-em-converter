const history = document.getElementById("history");
const mainForm = document.getElementById("main-form");
const pixelInput = document.getElementById("pixel-input");
const emInput = document.getElementById("em-input");
const BaseInput = document.getElementById("base-input");
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

  if (isNaN(Number(input)) || input.length < 1) return;

  switch (type) {
    case "px":
      result = Number(em * base);
      break;
    case "em":
      result = Number(px / base);
      break;
  }

  return result;
}

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const [em, pixel] = [
    conversion(pixelInput.value, BaseInput.value, "em"),
    conversion(emInput.value, BaseInput.value, "px"),
  ];

  if (typeof em === "string" || typeof pixel === "string") {
    errorOutput.innerText = "Please enter a valid number";
    return;
  }

  history.innerHTML += `<p>${pixel}px = ${em}em</p>`;

  mainForm.reset();
});
