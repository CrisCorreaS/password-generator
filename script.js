const BOTON_SUBMIT = document.querySelector(".generate-btn");
const BOTON_COPIAR = document.querySelector(".copy-wrapper");

const CHECK_MAYUSCULAS = document.querySelector("#uppercase");
const CHECK_MINUSCULAS = document.querySelector("#lowercase");
const CHECK_NUMEROS = document.querySelector("#numbers");
const CHECK_SIMBOLOS = document.querySelector("#symbols");

const PASSWORD_LENGTH = document.querySelector("input[type=range]");
const PASSWORD_LENGTH_NUMBER = document.querySelector(".char-count");

const PASSWORD = document.querySelector(".password-placeholder");
const TEXTO_SEGURIDAD = document.querySelector(".strength-rating-text");
const BARRAS_SEGURIDAD = document.querySelectorAll(".bar");

let mayusculas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
let minusculas = "abcdefghijklmnñopqrstuvwxyz";
let numeros = "0123456789";
let simbolos = "¿?¡!,.;:-_¨{}çÇ[]^`+*/@#~$€%()=";
let criterios = [mayusculas, minusculas, numeros, simbolos];

function generarContrasinal() {
  let mayusChecked = CHECK_MAYUSCULAS.checked;
  let minusChecked = CHECK_MINUSCULAS.checked;
  let numberChecked = CHECK_NUMEROS.checked;
  let symbolChecked = CHECK_SIMBOLOS.checked;

  let contrasinal = "";
  let contadorChecks = 0;

  let todosChecked = mayusChecked && minusChecked && numberChecked && symbolChecked;
  let algunoChecked = mayusChecked || minusChecked || numberChecked || symbolChecked;
  let checks = [mayusChecked, minusChecked, numberChecked, symbolChecked];

  PASSWORD.innerHTML = "";

  if (!algunoChecked) {
    PASSWORD.innerHTML = " ";
  } else {
    PASSWORD.classList.add("newPassword");
    let criterioContrasinal = "";

    if (todosChecked) {
      for (let j = 0; j < criterios.length; j++) {
        criterioContrasinal += criterios[j];
      }
      contadorChecks = checks.length;
    } else {
      for (let k = 0; k < criterios.length; k++) {
        if (checks[k]) {
          criterioContrasinal += criterios[k];
          contadorChecks++;
        }
      }
    }

    for (let l = 0; l < PASSWORD_LENGTH.valueAsNumber; l++) {
      let numero = Math.floor(Math.random() * criterioContrasinal.length);

      contrasinal += criterioContrasinal.charAt(numero);
    }

    PASSWORD.innerHTML = contrasinal;
  }

  return contadorChecks;
}

function gestionSeguridad(numero) {
  let valoresSeguridad = ["VERY-WEAK", "WEAK", "MEDIUM", "STRONG"];

  BARRAS_SEGURIDAD.forEach((barra) => {
    for (let m = 0; m < valoresSeguridad.length; m++) {
      barra.classList.remove(valoresSeguridad[m].toLowerCase());
    }
  });

  for (let n = 0; n <= numero; n++) {
    BARRAS_SEGURIDAD[n].classList.add(valoresSeguridad[numero].toLowerCase());
  }
  TEXTO_SEGURIDAD.innerHTML = valoresSeguridad[numero].replace("-", " ");
}

function generarCriterioSeguridad(numeroCaracteres, cantidadChecks) {
  if (numeroCaracteres < 12) {
    gestionSeguridad(0);
  } else {
    switch (cantidadChecks) {
      case 0:
        gestionSeguridad(cantidadChecks); // 0
        break;
      case 1:
        gestionSeguridad(cantidadChecks - 1); // 0
        break;
      case 2:
        gestionSeguridad(cantidadChecks - 1); // 1
        break;
      case 3:
        numeroCaracteres > 15
          ? gestionSeguridad(cantidadChecks - 1) // 2
          : gestionSeguridad(cantidadChecks - 2); // 1
        break;
      case 4:
        numeroCaracteres > 17
          ? gestionSeguridad(cantidadChecks - 1) // 3
          : gestionSeguridad(cantidadChecks - 2); // 2
        break;
    }
  }
}

function gestionContrasinal(e) {
  e.preventDefault();
  let cantidadChecks = generarContrasinal();

  generarCriterioSeguridad(PASSWORD_LENGTH.valueAsNumber, cantidadChecks);
}

BOTON_SUBMIT.addEventListener("click", gestionContrasinal, false);

function copiarContrasinal() {
  if (PASSWORD.innerHTML != "P4$5W0rD!") {
    navigator.clipboard.writeText(PASSWORD.innerHTML);
  }
}

BOTON_COPIAR.addEventListener("click", copiarContrasinal, false);

PASSWORD_LENGTH.addEventListener("input", () => {
    PASSWORD_LENGTH_NUMBER.innerHTML = PASSWORD_LENGTH.valueAsNumber;

    let porcentaje = (PASSWORD_LENGTH.valueAsNumber - PASSWORD_LENGTH.min) /(PASSWORD_LENGTH.max - PASSWORD_LENGTH.min);
    PASSWORD_LENGTH.style.setProperty("--seek-before-width", `${porcentaje * 100}%`); // Así se cambia el valor de una variable de css
  },
  false
);
// The "oninput event" occurs immediately after the content or value of an <input> or <textarea> element has been changed, while "onchange" occurs when the element loses focus and the onchange event also works on <select> elements
