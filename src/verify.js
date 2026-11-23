const { ventas } = require("./data.js");

const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,

    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,

    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analytics.js");

const { isDeepStrictEqual } = require("node:util");

function verificar(nombre, resultadoCiclo, resultadoMetodo) {
    if (isDeepStrictEqual(resultadoCiclo, resultadoMetodo)) {
        console.log(nombre + ": OK");
    } else {
        console.log(nombre + ": DIFERENTE");
        console.log("Ciclo:", resultadoCiclo);
        console.log("Método:", resultadoMetodo);
    }
}

console.log("\n--- VERIFICACIÓN DE INDICADORES ---");

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Ventas por ciudad - Medellín",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);

/* =====================================
   MOSTRAR AGRUPACIONES Y RANKINGS
===================================== */

console.log("\n--- TOTAL VENDIDO POR CIUDAD ---");
console.log(totalPorCiudad(ventas));

console.log("\n--- UNIDADES POR PRODUCTO ---");
console.log(unidadesPorProducto(ventas));

console.log("\n--- TOP 3 PRODUCTOS POR VALOR ---");
console.log(topProductosPorValor(ventas, 3));

function totalVendidoError(ventas) {
    return ventas.reduce((total, venta) => {
        return total + venta.precio;
    }, 0);
}

console.log("\n--- PRUEBA DEL ERROR 1 ---");

const resultadoIncorrecto = totalVendidoError(ventas);
const resultadoCorrecto = totalVendidoM(ventas);

console.log("Resultado anterior:", resultadoIncorrecto);
console.log("Resultado corregido:", resultadoCorrecto);

console.log(
    "¿La corrección coincide con el ciclo?:",
    isDeepStrictEqual(totalVendido(ventas), resultadoCorrecto)
        ? "OK"
        : "DIFERENTE"
);

function ventasPorCiudadError(ventas, ciudad) {
    return ventas.filter(venta => venta.ciudad === ciudad);
}

console.log("\n--- PRUEBA DEL ERROR 2 ---");

const resultadoAnterior = ventasPorCiudadError(ventas, "Medellín");
const resultadoCorregido = ventasPorCiudadM(ventas, "Medellín");

console.log(
    "Tipo de resultado anterior:",
    Array.isArray(resultadoAnterior) ? "Arreglo" : typeof resultadoAnterior
);

console.log("Resultado corregido:", resultadoCorregido);

console.log(
    "¿La corrección coincide con el ciclo?:",
    isDeepStrictEqual(
        ventasPorCiudad(ventas, "Medellín"),
        resultadoCorregido
    ) ? "OK" : "DIFERENTE"
);