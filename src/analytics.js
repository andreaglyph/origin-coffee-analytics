function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    if (ventas.length === 0) return null;

    let total = 0;

    for (const venta of ventas) {
        total += valorVenta(venta);
    }

    return total;
}

function unidadesVendidas(ventas) {
    if (ventas.length === 0) return null;

    let total = 0;

    for (const venta of ventas) {
        total += venta.cantidad;
    }

    return total;
}

function ventasPorCiudad(ventas, ciudad) {
    if (!ciudad || typeof ciudad !== "string") return 0;

    const buscada = ciudad.trim().toLowerCase();
    let total = 0;

    for (const venta of ventas) {
        if (venta.ciudad.trim().toLowerCase() === buscada) {
            total += valorVenta(venta);
        }
    }

    return total;
}

/*CON MÉTODOS*/

function totalVendidoM(ventas) {
    if (ventas.length === 0) return null;

    return ventas.reduce((acumulador, venta) => {
        return acumulador + valorVenta(venta);
    }, 0);
}

function unidadesVendidasM(ventas) {
    if (ventas.length === 0) return null;

    return ventas.reduce((acumulador, venta) => {
        return acumulador + venta.cantidad;
    }, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
    if (!ciudad || typeof ciudad !== "string") return 0;

    const buscada = ciudad.trim().toLowerCase();

    const ventasFiltradas = ventas.filter(venta => {
        return venta.ciudad.trim().toLowerCase() === buscada;
    });

    return ventasFiltradas.reduce((acumulador, venta) => {
        return acumulador + valorVenta(venta);
    }, 0);
}

/*AGRUPACIONES*/

function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const ciudad = venta.ciudad.trim();
        const clave = ciudad.toLowerCase();

        if (!acumulador[clave]) {
            acumulador[clave] = {
                ciudad: ciudad,
                total: 0
            };
        }

        acumulador[clave].total += valorVenta(venta);

        return acumulador;
    }, {});
}

function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();
        const clave = producto.toLowerCase();

        if (!acumulador[clave]) {
            acumulador[clave] = {
                producto: producto,
                unidades: 0
            };
        }

        acumulador[clave].unidades += venta.cantidad;

        return acumulador;
    }, {});
}

/* RANKING DE PRODUCTOS*/

function topProductosPorValor(ventas, k) {
    const agrupados = ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();
        const clave = producto.toLowerCase();

        if (!acumulador[clave]) {
            acumulador[clave] = {
                producto: producto,
                total: 0
            };
        }

        acumulador[clave].total += valorVenta(venta);

        return acumulador;
    }, {});

    return Object.values(agrupados)
        .sort((a, b) => b.total - a.total)
        .slice(0, Math.max(0, k));
}

/* EXPORTAR FUNCIONES*/

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,

    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,

    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};
