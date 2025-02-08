
// export let correo1 = null;
// export let cedula1 = null;


let telefono1 = null; // Variable para almacenar la cédula

//let var_oculta = null; // Variable para almacenar la cédula

// Exportar función para obtener la cédula
export const getCedula = () => telefono1;

// Verifica si existe el telefono al desenfocar el campo se activa este evento
document.getElementById("telefono").addEventListener("blur", async () => {
    const telefono = document.getElementById("telefono").value;

    if (telefono) {
        try {
            // Realizar la solicitud POST con fetch
            const response = await fetch("/check-cedula", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indicamos que enviamos JSON
                },
                body: JSON.stringify({ telefono }), // Convertir los datos a JSON
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const data = await response.json(); // Convertir la respuesta a JSON
            console.log(data);

            if (data.exists) {
                const { name, correo, fecha, telefono, nota, saldo, cedula, id_cliente } = data.data;
                document.getElementById("name").value = name;
                // const nombre = document.getElementById("nombre").value.trim(); para eliminina espacios
                document.getElementById("correo").value = correo;
                document.getElementById("telefono").value = telefono;
                document.getElementById("nota").value = nota;
                document.getElementById("fecha").value = fecha;
                document.getElementById("saldo").value = saldo;
                document.getElementById("cedula").value = cedula;
                document.getElementById("variable_oculta").value = cedula;//para enviarla post con esto puedo saber si el cliente existe para saber si es actualizar o guardar nuevo cliente


                // Actualizar los valores exportables
                // correo1 = correo;
                // cedula1 = cedula;

                // Actualizar la cédula
                telefono1 = telefono;

                //const fechax = new Date(data.fecha); // Convertir a objeto Date
                // Formatear la fecha (YYYY-MM-DD)
                //const fechaFormateada = fecha.toISOString().split("T")[0];
                // document.getElementById("fecha").textContent = fechaFormateada;




                //console.log(fechax);
                //  document.getElementById("telefono").value = telefono;
            } else {
                //  document.getElementById("name").value = "";
                //  document.getElementById("correo").value = "";
            }
        } catch (error) {
            console.error("Error verificando la cédula:", error);
        }
    }


});

// exportar una constante
//export const MODULES_BECAME_STANDARD_YEAR = 2015;

// verificatelefono.js
//export const correoObtenido = correo.value;