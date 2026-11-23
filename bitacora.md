BITÁCORA DE ANÁLISIS - CAFÉ ORIGEN (v0.1)

1. DICCIONARIO DE DATOS
------------------------------------------------------------
A continuación se detalla cada propiedad presente en los registros del historial de ventas:

- id (Number): Identificador único y secuencial de la transacción de venta.
- fecha (String - Formato ISO AAAA-MM-DD): Fecha exacta en la que se realizó la transacción de venta.
- cliente (String): Código único asignado al cliente que realizó la compra (ej. C01, C02).
- producto (String): Nombre o referencia comercial del artículo de café o accesorio vendido.
- ciudad (String): Ciudad de destino o sucursal donde se efectuó o despachó la compra.
- cantidad (Number): Número de unidades adquiridas del producto en dicha transacción.
- precio (Number): Precio unitario del producto en pesos colombianos (COP).


2. CASOS BORDE DETECTADOS Y DECISIONES DE CALIDAD
------------------------------------------------------------
Durante la exploración de los datos en datos.js, se identificaron tres problemas de calidad que requieren un manejo programático para evitar alteraciones en los indicadores de negocio:

1. Inconsistencia de formato en cadenas de texto (Ciudades en minúscula):
   - Problema: El registro con id: 5 tiene la ciudad escrita como "medellín" en minúscula, a diferencia del resto que usan la inicial en mayúscula ("Medellín"). Al agrupar o filtrar por ciudad, esto crearía dos categorías separadas incorrectamente ("Medellín" y "medellín").
   - Decisión: Estandarizar todas las ciudades aplicando métodos de normalización de cadenas de texto (como .toLowerCase() o .trim()) antes de realizar cualquier agrupación, conteo o acumulación por ciudad.

2. Unidades de cantidad en cero (Ventas nulas o inválidas):
   - Problema: El registro con id: 8 (cliente: "C06") tiene una cantidad de 0 unidades vendidas, lo que matemáticamente no aporta al volumen de ventas pero sí afecta el conteo de transacciones si no se valida.
   - Decisión: Implementar una validación condicional (cantidad > 0) al momento de calcular acumulados e ingresos totales, descartando o filtrando registros con cantidad cero para que no distorsionen los resultados reales del negocio.

3. Duplicidad potencial de Clientes con registros múltiples:
   - Problema: Algunos clientes (como C01) aparecen en múltiples transacciones en fechas distintas (id: 1, id: 4, id: 11), lo que es un comportamiento de negocio válido, pero al calcular clientes únicos o frecuentes requiere un análisis con estructuras de control adecuadas (por ejemplo, usando conjuntos o acumuladores por ID de cliente).
   - Decisión: Tratar el campo cliente como una clave categórica para identificar frecuencias de compra y asegurar que los rankings por cliente agrupen correctamente todas sus transacciones históricas sin duplicar identificadores.

DEL CICLO AL MÉTODO: RANKINGS Y AGRUPACIONES

1. TOTAL VENDIDO

¿Qué recorro?
Recorro todas las ventas del arreglo.

¿Qué filtro?
No filtro ninguna venta.

¿Qué transformo?
Calculo el valor de cada venta multiplicando la cantidad por el precio.

¿Qué acumulo?
Sumo el dinero de todas las ventas utilizando reduce().

¿Cómo agrupo?
No agrupo, solamente acumulo el total vendido.

2. UNIDADES VENDIDAS

¿Qué recorro?
Recorro todas las ventas del arreglo.

¿Qué filtro?
No filtro ningún elemento.

¿Qué transformo?
Obtengo la cantidad de unidades de cada venta.

¿Qué acumulo?
Sumo las cantidades para conocer el total de unidades vendidas.

¿Cómo agrupo?
No agrupo, utilizo reduce() para sumar todas las unidades.

3. VENTAS POR CIUDAD

¿Qué recorro?
Recorro las ventas del arreglo.

¿Qué filtro?
Selecciono solamente las ventas que pertenecen a la ciudad indicada.

¿Qué transformo?
Normalizo el nombre de la ciudad utilizando trim() y toLowerCase() para evitar diferencias por espacios o mayúsculas.

¿Qué acumulo?
Sumo el valor de las ventas que corresponden a esa ciudad.

¿Cómo agrupo?
Utilizo filter() para seleccionar las ventas y reduce() para calcular el total.

4. TOTAL VENDIDO POR CIUDAD

¿Qué recorro?
Recorro todas las ventas registradas.

¿Qué filtro?
No filtro ninguna venta.

¿Qué transformo?
Normalizo los nombres de las ciudades para que, por ejemplo, "Bogotá" y "Bogotá " pertenezcan al mismo grupo.

¿Qué acumulo?
Acumulo el dinero generado por cada ciudad.

¿Cómo agrupo?
Utilizo un objeto como diccionario, donde cada ciudad tiene su propio total de ventas.

5. UNIDADES POR PRODUCTO

¿Qué recorro?
Recorro todas las ventas del arreglo.

¿Qué filtro?
No filtro productos.

¿Qué transformo?
Obtengo el nombre del producto y la cantidad vendida.

¿Qué acumulo?
Sumo las unidades de cada producto.

¿Cómo agrupo?
Utilizo un objeto como diccionario para reunir las cantidades de las ventas que tienen el mismo producto.

6. TOP 3 PRODUCTOS POR VALOR

¿Qué recorro?
Recorro todas las ventas registradas.

¿Qué filtro?
No filtro ventas individualmente.

¿Qué transformo?
Calculo cuánto dinero genera cada producto.

¿Qué acumulo?
Sumo el valor de las ventas correspondientes a cada producto.

¿Cómo agrupo?
Utilizo reduce() para agrupar las ventas por producto, sort() para ordenar de mayor a menor y slice() para seleccionar los tres primeros productos. Finalmente, utilizo map() para asignar una posición a cada uno.

CONCLUSIÓN

Con esta actividad aprendí a utilizar métodos de arreglos como map(), filter() y reduce() para trabajar con información de ventas. También aprendí a agrupar datos mediante objetos, ordenar productos según el dinero generado y seleccionar los primeros resultados sin modificar el arreglo original. Además, comprendí la importancia de comparar los resultados de los ciclos con los métodos para comprobar que ambos realizan el mismo proceso.

ERRORES REPORTADOS POR LA GERENTE

ERROR 1: CÁLCULO INCORRECTO DEL TOTAL VENDIDO

Síntoma:
El total vendido no coincidía con el resultado esperado.

Entrada que lo produce:
Una venta con cantidad mayor que uno. Por ejemplo:
producto: Café
cantidad: 3
precio: 20000

Hipótesis:
La función estaba sumando solamente el precio del producto y no tenía en cuenta la cantidad vendida.

Prueba realizada:
Se comparó el resultado de la función anterior con el cálculo correcto de cantidad por precio.

Resultado anterior: 20000
Resultado esperado: 60000

Causa:
En la versión anterior se acumulaba venta.precio en lugar de multiplicar venta.cantidad por venta.precio.

Corrección:
Se creó la función valorVenta(venta), que multiplica la cantidad por el precio. Después se utilizó esta función dentro de reduce() para acumular correctamente el dinero generado por las ventas.


ERROR 2: RESULTADO INCORRECTO EN VENTAS POR CIUDAD

Síntoma:
La función de ventas por ciudad devolvía un arreglo de ventas en lugar del total de dinero generado. También podía dejar por fuera registros cuando el nombre de la ciudad tenía diferencias de espacios o mayúsculas.

Entrada que lo produce:
Ventas registradas con nombres como:
"Medellín"
"medellín"
"Medellín "

Hipótesis:
La función solamente estaba filtrando las ventas, pero no estaba sumando su valor. Además, comparaba los nombres sin normalizarlos.

Prueba realizada:
Se ejecutó la función anterior con una ciudad y se verificó que el resultado era un arreglo. Después se ejecutó la versión corregida y se comparó con la función que utiliza ciclos.

Causa:
La función utilizaba filter() como resultado final y no aplicaba una normalización de los nombres de las ciudades.

Corrección:
Se utilizó trim() y toLowerCase() para normalizar los nombres. Después se combinó filter() con reduce() para seleccionar las ventas de la ciudad y sumar el valor de cada una.

CONCLUSIÓN DE LAS PRUEBAS

Se reprodujeron los dos comportamientos incorrectos de las versiones anteriores y se verificó que las funciones corregidas producen los resultados esperados. Las pruebas permiten comprobar que los cálculos y las agrupaciones funcionan correctamente con los datos disponibles.