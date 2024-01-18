const BOTON_SUBMIT = document.querySelector(".generate-btn");
const BOTON_COPIAR = document.querySelector(".copy-wrapper");

const CHECK_MAYUSCULAS = document.querySelector("#uppercase");
const CHECK_MINUSCULAS = document.querySelector("#lowercase");
const CHECK_NUMEROS = document.querySelector("#numbers");
const CHECK_SIMBOLOS = document.querySelector("#symbols");
const PASSWORD_LENGTH = document.querySelector("input[type=range]");

const PASSWORD = document.querySelector(".password-placeholder");
const TEXTO_SEGURIDAD = document.querySelector(".strength-rating-text");

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
    } else {
      for (let k = 0; k < criterios.length; k++) {
        if (checks[k]) {
          criterioContrasinal += criterios[k];
          contadorChecks++;
        }
      }
    }

    for (let l = 0; l < PASSWORD_LENGTH.value; l++) {
      let numero = Math.floor(Math.random() * criterioContrasinal.length);

      contrasinal += criterioContrasinal.charAt(numero);
    }

    PASSWORD.innerHTML = contrasinal;
  }

  return contadorChecks;
}

function generarCriterioSeguridad(numeroCaracteres, cantidadChecks){
    let valoresSeguridad = ["VERY WEAK", "WEAK", "MEDIUM", "STRONG"];

    switch(cantidadChecks){
        case 0: 


    }
}


function gestionContrasinal(e){
    let cantidadChecks = generarContrasinal();

    generarCriterioSeguridad(PASSWORD_LENGTH.value, cantidadChecks);

    e.preventDefault();
}

BOTON_SUBMIT.addEventListener("click", gestionContrasinal, false);
//BOTON_COPIAR.addEventListener("click", copiarContrasinal, false);
