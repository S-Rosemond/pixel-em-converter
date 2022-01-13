const history = document.getElementById("history");
const mainForm = document.getElementById("main-form");
const pixelInput = document.getElementById("pixel-input");
const EmInput = document.getElementById("em-input");
const BaseInput = document.getElementById("base-input");
const formGroupInputs = document.querySelectorAll(
  ".form-group > input[type='text']"
);

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

// console.log(formGroupInputs);
formGroupInputs.forEach((elements) => {
  //parentnode.children[0] option 1

  elements.addEventListener("focus", (e) => {
    console.log(e, e.explicitOriginalTarget);
  });

  elements.addEventListener("blur", () => {});

  // option 2

  e.explicitOriginalTarget.classList.add();
});
