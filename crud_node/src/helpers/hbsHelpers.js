// views/config/hbsHelpers.js

export function registerHelpers(hbs) {


    hbs.registerHelper('eq', (a, b) => {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.toLowerCase() === b.toLowerCase();
        }
        return a === b;
    });

    hbs.registerHelper('colorFila', (estatus) => {
        switch (estatus.toLowerCase()) {
            case 'reparar': return 'table-success';
            case 'entregado': return 'table-warning';
            case 'revisado': return 'table-info';
            case 'presupuesto': return 'table-secondary';
            case 'abandonado': return 'table-danger';
            case 'recibido': return 'table-warning';
            case 'reparado': return 'table-danger';
            default: return '';
        }
    });


    // 🆕 Nuevo helper para marcar <option selected>
    hbs.registerHelper('isSelected', function (actual, valor) {
        if (!actual || !valor) return '';
        return String(actual).toLowerCase() === String(valor).toLowerCase() ? 'selected' : '';
    });

}


