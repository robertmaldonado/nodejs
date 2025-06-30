
// codigo que se ejecuta cuando envio el formulario y se ejecuta en el navegador


// otroArchivo.js
//import { correoObtenido } from './telfVerification.js';

//import { correo1, cedula1 } from './telfVerification.js';
import { getCedula } from './telfVerification.js';

//import { getIdCliente } from "./telfVerification.js";







export function handleFormSubmission(formId) {
    document.getElementById(formId).addEventListener("submit", (event) => {
        event.preventDefault();




        // mostrarCorreo();
        // console.log(`Correo: ${correo}, Cédula: ${cedula}`);
        const cedula = getCedula();
        if (cedula) {
            console.log(`Cédula obtenida: ${cedula}`);
        } else {
            console.log("No hay una cédula disponiblewww.");  // en el navegador 
            console.log(`Cédula obtenida: ${cedula}`);  // cuando no hay cedula el valor es null
        }



        alert("Formulario enviado correctamente.zx");



        // Obtener el valor de var_id_cliente
        //  const idCliente = getIdCliente();
        //console.log("El ID del cliente es:", idCliente);



        event.target.submit(); // Enviar el formulario manualmente
    });
}


// function mostrarCorreo() {
//     console.log('El correo es:', correoObtenido);
// }