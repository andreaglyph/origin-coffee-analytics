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

function ticketPromedio(ventas) {
    let total = 0;
    let validas = 0;
  for (const v of ventas) {
    if (v.cantidad > 0) {
      total += valorVenta(v);
      validas++;
    }
}
    return validas === 0 ? 0 : total / validas;
}

function ventasPorCiudad(ventas, ciudad) {
  if (!ciudad || typeof ciudad !== "string") return 0;
  const buscada = ciudad.trim().toLowerCase();
  let total = 0;
  for (const v of ventas) {
    if (v.ciudad.trim().toLowerCase() === buscada) {
      total += valorVenta(v);
    }
  }
  return total;
}

const ventasCompletas = [
  { id: 1, fecha: "2026-09-01", cliente: "C01", producto: "Origen Huila 500 g", ciudad: "Medellín", cantidad: 2, precio: 42000 },
  { id: 2, fecha: "2026-09-01", cliente: "C02", producto: "Origen Nariño 250 g", ciudad: "Bogotá", cantidad: 1, precio: 26000 },
  { id: 3, fecha: "2026-09-02", cliente: "C03", producto: "Prensa francesa", ciudad: "Cali", cantidad: 1, precio: 95000 },
  { id: 4, fecha: "2026-09-02", cliente: "C01", producto: "Origen Huila 500 g", ciudad: "Medellín", cantidad: 1, precio: 42000 },
  { id: 5, fecha: "2026-09-03", cliente: "C04", producto: "Origen Sierra 500 g", ciudad: "medellín", cantidad: 3, precio: 45000 },
  { id: 6, fecha: "2026-09-03", cliente: "C05", producto: "Origen Nariño 250 g", ciudad: "Bogotá", cantidad: 2, precio: 26000 },
  { id: 7, fecha: "2026-09-04", cliente: "C02", producto: "Molino manual", ciudad: "Bogotá", cantidad: 1, precio: 120000 },
  { id: 8, fecha: "2026-09-04", cliente: "C06", producto: "Origen Huila 500 g", ciudad: "Cali", cantidad: 0, precio: 42000 },
  { id: 9, fecha: "2026-09-05", cliente: "C03", producto: "Origen Sierra 500 g", ciudad: "Cali", cantidad: 2, precio: 45000 },
  { id: 10, fecha: "2026-09-05", cliente: "C07", producto: "Origen Huila 500 g", ciudad: "Pereira", cantidad: 4, precio: 42000 },
  { id: 11, fecha: "2026-09-06", cliente: "C01", producto: "Prensa francesa", ciudad: "Medellín", cantidad: 1, precio: 95000 },
  { id: 12, fecha: "2026-09-06", cliente: "C08", producto: "Origen Nariño 250 g", ciudad: "Bogotá", cantidad: 3, precio: 26000 },
];

const ventaUnElemento = [
  { id: 1, fecha: "2026-09-01", cliente: "C01", producto: "Origen Huila 500 g", ciudad: "  Medellín ", cantidad: 2, precio: 42000 },
];

const ventasVacias = [];

function ejecutarPruebas(etiqueta, datos) {
  console.log(`${etiqueta}`);
  console.log("totalVendido:", totalVendido(datos));
  console.log("unidadesVendidas:", unidadesVendidas(datos));
  console.log("ventaMayor:", ventaMayor(datos));
  console.log("ticketPromedio:", ticketPromedio(datos));
  console.log("ventasPorCiudad (' medellín '):", ventasPorCiudad(datos, " medellín "));
}

ejecutarPruebas("Arreglo completo (12)", ventasCompletas);
ejecutarPruebas("Un solo elemento (1)", ventaUnElemento);
ejecutarPruebas("Arreglo vacío (0)", ventasVacias);

