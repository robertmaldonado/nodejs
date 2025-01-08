export function handleFormSubmission(formId) {
    document.getElementById(formId).addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Formulario enviado correctamente.zx");

         event.target.submit(); // Enviar el formulario manualmente
    });
}