



import { handleFormSubmission } from './form-handler.js';
import { clearFormFields, appName } from './utils.js';

import { validateField } from './validations.js';

// Usar las funciones importadas
console.log(`Bienvenido a ${appName}`);

handleFormSubmission("form");
clearFormFields("form");


const error = validateField("name");
if (error) {
    console.error(error);
} else {
    console.log("El campo es válido.");
}



// // Manejar el envío del formulario
// document.getElementById("form").addEventListener("submit", async (event) => {
//     event.preventDefault(); // Evitar envío predeterminado
//     alert("Por favor, completa todos los campos correctamente.xxx");
//     // Si necesitas realizar operaciones adicionales, hazlo aquí
//     // event.target.submit(); // Enviar el formulario manualmente
// });






