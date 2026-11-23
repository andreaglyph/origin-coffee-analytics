
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
} = require("./analitica.js");

const { isDeepStrictEqual } = require("node:util");

/*FUNCIÓN DE VERIFICACIÓN*/

function verificar(nombre, resultadoCiclo, resultadoMetodo) {
    if (isDeepStrictEqual(resultadoCiclo, resultadoMetodo)) {
        console.log(nombre + ": OK");
    } else {
        console.log(nombre + ": DIFERENTE");
        console.log("Ciclo:", resultadoCiclo);
        console.log("Método:", resultadoMetodo);
    }
}

/*COMPARAR INDICADORES*/

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

/*MOSTRAR AGRUPACIONES Y RANKINGS*/

console.log("\n--- TOTAL VENDIDO POR CIUDAD ---");
console.log(totalPorCiudad(ventas));

console.log("\n--- UNIDADES POR PRODUCTO ---");
console.log(unidadesPorProducto(ventas));

console.log("\n--- TOP 3 PRODUCTOS POR VALOR ---");
console.log(topProductosPorValor(ventas, 3));
