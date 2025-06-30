export function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
        return "El campo no puede estar vacío.";
    }
    return null;
}