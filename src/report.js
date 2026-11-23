const { ventas } = require("./data.js");

const {
    totalVendido,
    unidadesVendidas,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analytics.js");

function pesos(valor) {
    return "$" + valor.toLocaleString("es-CO", {
        maximumFractionDigits: 0
    });
}

function titulo(texto) {
    console.log("\n" + "=".repeat(55));
    console.log(texto);
    console.log("=".repeat(55));
}

function linea(etiqueta, valor) {
    console.log(etiqueta.padEnd(32) + String(valor));
}

titulo("REPORTE GENERAL DE VENTAS");

linea("Cantidad de ventas:", ventas.length);
linea("Unidades vendidas:", unidadesVendidas(ventas) ?? 0);
linea("Total vendido:", pesos(totalVendido(ventas) ?? 0));

titulo("VENTAS POR CIUDAD");

const ciudades = Object.values(totalPorCiudad(ventas));

for (const ciudad of ciudades) {
    linea(ciudad.ciudad, pesos(ciudad.total));
}

titulo("UNIDADES VENDIDAS POR PRODUCTO");

const productos = Object.values(unidadesPorProducto(ventas));

for (const producto of productos) {
    linea(producto.producto, producto.unidades + " unidades");
}

titulo("TOP 3 PRODUCTOS POR VALOR");

const topTres = topProductosPorValor(ventas, 3);

if (topTres.length === 0) {
    console.log("No hay productos para mostrar.");
} else {
    for (const producto of topTres) {
        linea(
            producto.posicion + ". " + producto.producto,
            pesos(producto.total)
        );
    }
}

function mostrarResumenDia(fecha) {
    const ventasDia = ventasDelDia(ventas, fecha);

    titulo("RESUMEN DEL DÍA: " + fecha);

    if (ventasDia.length === 0) {
        console.log("No se registraron ventas para esta fecha.");
        linea("Cantidad de ventas:", 0);
        linea("Unidades vendidas:", 0);
        linea("Total vendido:", pesos(0));
        return;
    }

    const totalDia = totalVendido(ventasDia);
    const unidadesDia = unidadesVendidas(ventasDia);

    linea("Cantidad de ventas:", ventasDia.length);
    linea("Unidades vendidas:", unidadesDia);
    linea("Total vendido:", pesos(totalDia));
}

const fechaConVentas = ventas.length > 0
    ? ventas[0].fecha
    : "2026-09-01";

const fechaSinVentas = "2026-09-07";

mostrarResumenDia(fechaConVentas);
mostrarResumenDia(fechaSinVentas);

titulo("VALIDACIONES");

const reporteTexto = [
    ...ciudades.map(c => c.ciudad),
    ...productos.map(p => p.producto),
    ...topTres.map(p => p.producto)
].join(" ");

const clavesCiudades = ciudades.map(c =>
    c.ciudad.trim().toLowerCase()
);

const sinDuplicados = new Set(clavesCiudades).size === clavesCiudades.length;

console.log(
    "¿Hay valores NaN?:",
    /NaN/.test(reporteTexto) ? "SÍ" : "NO"
);

console.log(
    "¿Hay valores undefined?:",
    /undefined/.test(reporteTexto) ? "SÍ" : "NO"
);

console.log(
    "¿Hay ciudades duplicadas?:",
    sinDuplicados ? "NO" : "SÍ"
);
