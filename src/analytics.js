const { ventas } = require('./data.js');

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    if (ventas.length === 0) {
        return null;
    }
    let total = 0;
    for (const venta of ventas) {
        total += valorVenta(venta);
    }
    return total;
}

function unidadesVendidas(ventas){
    if (ventas.length === 0) {
        return null;
    }
    let total = 0;
    for (const venta of ventas) {
        total += venta.cantidad;
    }
    return total
}

function ventaMayor(ventas) {
    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];
    for (const venta of ventas) {
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }

    return mayor;
}