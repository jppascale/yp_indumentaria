const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
  nombre: false,
  mail: false,
}

const validarFormulario = (e) => {
  switch (e.target.name) {
        case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
        break;

        case "mail":
                validarCampo(expresiones.mail, e.target, 'mail');
        break;
  }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
      document.getElementById('campo__nombre').classList.remove('formulario__campo-incorrecto');
      document.getElementById('campo__nombre').classList.add('formulario__campo-correcto');
    }
}
form = id("formulario"),

    msjError = classes("error"),
    iconoExito = classes("success-icon"),
    iconoFalla = classes("failure-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();

 /* engine(nombre, 0, "Nombre no puede estar en blanco");
  engine(mail, 1, "Email no puede estar en blanco");
  /*engine(password, 2, "Password cannot be blank");*/
});

let engine = (id, serial, message) => {
  if (id.value.trim() === "") {
    msjError[serial].innerHTML = message;
    id.style.border = "2px solid red";

    // icons
    iconoFalla[serial].style.opacity = "1";
    iconoExito[serial].style.opacity = "0";
  } else {
    msjError[serial].innerHTML = "";
    id.style.border = "2px solid green";

    // icons
    iconoFalla[serial].style.opacity = "0";
    iconoExito[serial].style.opacity = "1";
  }
};