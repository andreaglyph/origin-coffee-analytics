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