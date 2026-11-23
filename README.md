
# Origin Coffee Analytics

## ¿Qué es el proyecto?

Origin Coffee Analytics es un proyecto desarrollado en JavaScript
para analizar información de ventas de una empresa de café.

Permite calcular indicadores generales, agrupar las ventas por
ciudad y producto, identificar los productos que generan más
dinero y consultar el comportamiento de las ventas por fecha.

El proyecto utiliza arreglos, ciclos, métodos como map(), filter()
y reduce(), objetos como diccionarios y funciones de ordenamiento.

## Estructura del proyecto

```text
origin-coffee-analytics/
│
├── src/
│   ├── data.js
│   ├── analytics.js
│   ├── verify.js
│   └── report.js
│   └── explore.js
│
└── bitacora.md
└── README.md
```

## ¿Cómo ejecutar el proyecto?

Se necesita tener Node.js instalado.

Desde la terminal, ubicarse en la carpeta raíz del proyecto.

Para ejecutar las verificaciones:

```bash
node src/verify.js
```

Para generar el reporte:

```bash
node src/reporte.js
```

## ¿Qué preguntas responde?

### Resumen general
- ¿Cuántas ventas se realizaron?
- ¿Cuántas unidades se vendieron?
- ¿Cuánto dinero se generó en total?

### Ventas por ciudad
- ¿Cuánto dinero se vendió en cada ciudad?
- ¿Cómo se agrupan los nombres de ciudades que tienen espacios o diferencias de mayúsculas?

### Unidades por producto
- ¿Cuántas unidades se vendieron de cada producto?

### Ranking de productos
- ¿Cuáles son los tres productos que más dinero generaron?
- ¿Cuál es el orden de los productos según su valor vendido?

### Análisis por fecha
- ¿Cuántas ventas se realizaron en un día específico?
- ¿Cuántas unidades se vendieron ese día?
- ¿Cuál fue el total vendido?
- ¿Qué ocurre cuando no existen ventas para una fecha?

## Validaciones

El proyecto compara los resultados de las funciones con ciclos
y las funciones con métodos para comprobar que sean iguales.

También se revisa que el reporte no presente valores NaN,
undefined ni grupos duplicados.

## Versión

v0.1
