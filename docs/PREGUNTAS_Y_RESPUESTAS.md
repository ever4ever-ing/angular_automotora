# Preguntas y Respuestas - Proyecto Catálogo de Autos

## 1. ¿Cuál es el propósito principal de este proyecto?
**R:** Es una aplicación Angular de catálogo de autos que permite visualizar, filtrar y ver detalles de vehículos en venta. Funciona como un sistema de automotora donde los usuarios pueden buscar autos por diferentes criterios como marca, precio, kilometraje y texto de búsqueda.

## 2. ¿Qué versión de Angular utiliza el proyecto y qué característica moderna implementa?
**R:** El proyecto utiliza Angular 17+ con componentes standalone (standalone: true), lo que elimina la necesidad de módulos NgModule tradicionales. También implementa signals para manejo reactivo de estado.

## 3. ¿Cuáles son los componentes principales de la aplicación?
**R:** El proyecto tiene 5 componentes principales:
- **Layout**: Componente contenedor principal con estructura de navegación
- **AutoListaComponent**: Lista de autos con sistema de filtrado
- **AutoDetalle**: Vista detallada de un auto específico con galería de imágenes
- **FiltrosAutos**: Panel de filtros para búsqueda y rangos
- **SidebarAutos**: Barra lateral con filtrado por marcas

## 4. ¿Qué propiedades tiene la interfaz `Auto`?
**R:** La interfaz `Auto` incluye:
- `id`: Identificador único (number)
- `marca`: Fabricante del vehículo (string)
- `modelo`: Modelo específico (string)
- `anio`: Año de fabricación (number)
- `precio`: Precio en dólares (number)
- `imagen`: URL de imagen principal (string)
- `imagenes`: Array opcional de URLs para galería (string[])
- `color`: Color del vehículo (string)
- `kilometraje`: Kilómetros recorridos (number)
- `descripcion`: Texto descriptivo opcional (string)

## 5. ¿Cómo funciona el sistema de caché en el `AutoService`?
**R:** El `AutoService` implementa un sistema de caché en memoria usando la propiedad privada `autosCache`. Al cargar autos por primera vez, hace una petición HTTP al archivo `autos.json` y almacena el resultado. En llamadas posteriores, devuelve los datos desde caché con un delay simulado de 300ms, evitando peticiones HTTP innecesarias.

## 6. ¿Qué es el servicio `Filtro` y qué tecnología utiliza para el manejo de estado?
**R:** Es un servicio Injectable que gestiona el estado de todos los filtros de búsqueda usando **signals de Angular**. Maneja filtros como marca seleccionada, texto de búsqueda, rango de precios (mínimo y máximo), y kilometraje máximo. Proporciona métodos para establecer, limpiar y resetear todos los filtros.

## 7. ¿Cuáles son las rutas configuradas en la aplicación?
**R:** La aplicación tiene 3 rutas principales:
- `/` → Redirecciona a `/catalogo`
- `/catalogo` → Muestra el componente `AutoListaComponent`
- `/auto/:id` → Muestra el componente `AutoDetalle` con el detalle de un auto específico

Todas están anidadas dentro del componente `Layout` que actúa como contenedor.

## 8. ¿Cómo se implementa la reactividad en el `AutoListaComponent`?
**R:** Utiliza el hook `effect()` de Angular que se ejecuta automáticamente cuando cualquier signal cambia. Observa los cambios en `marcaSeleccionada`, `textoBusqueda`, `precioMin`, `precioMax` y `kilometrajeMax` del servicio `Filtro`, y ejecuta automáticamente el método `filtrarAutos()` para actualizar la lista mostrada.

## 9. ¿Qué filtros están disponibles para buscar autos?
**R:** La aplicación ofrece 5 tipos de filtros:
1. **Por marca**: Selección específica de fabricante
2. **Por texto**: Búsqueda que coincida en el nombre de la marca
3. **Por precio mínimo**: Valor mínimo del rango de precio
4. **Por precio máximo**: Valor máximo del rango de precio (hasta $100,000)
5. **Por kilometraje**: Filtrado por kilometraje máximo (hasta 200,000 km)

## 10. ¿Cómo obtiene el `AutoDetalle` el ID del auto a mostrar?
**R:** Utiliza `ActivatedRoute` para acceder a los parámetros de la ruta. En el `ngOnInit()`, extrae el ID con `this.route.snapshot.paramMap.get('id')` y lo convierte a número con `Number()`. Luego usa ese ID para consultar el auto específico mediante `autoService.getAutoById(id)`.

## 11. ¿Qué funcionalidad tiene la galería de imágenes en `AutoDetalle`?
**R:** Implementa un carrusel de imágenes con tres funcionalidades:
- **siguienteImagen()**: Avanza a la siguiente imagen con navegación circular
- **imagenAnterior()**: Retrocede a la imagen anterior con navegación circular
- **seleccionarImagen(index)**: Permite seleccionar directamente una imagen específica

Utiliza el signal `imagenActual` para trackear qué imagen se está mostrando.

## 12. ¿Qué sucede si se intenta acceder a un auto que no existe?
**R:** El componente `AutoDetalle` detecta cuando `auto` es `undefined` después de la suscripción. Si esto ocurre, muestra un mensaje al usuario durante 2 segundos y luego redirige automáticamente a `/catalogo` usando `Router.navigate()`.

## 13. ¿Dónde se almacenan los datos de los autos y cómo se cargan?
**R:** Los datos se almacenan en un archivo JSON estático ubicado en `public/autos.json`. El `AutoService` los carga mediante `HttpClient.get<Auto[]>()`, simulando una llamada a una API con un delay de 500ms. Incluye manejo de errores con `catchError` que retorna un array vacío si falla la carga.

## 14. ¿Qué proveedores se configuran en `app.config.ts`?
**R:** Se configuran 3 proveedores principales:
- `provideBrowserGlobalErrorListeners()`: Para manejo global de errores
- `provideRouter(routes)`: Para el sistema de enrutamiento de la aplicación
- `provideHttpClient()`: Para habilitar peticiones HTTP (necesario para cargar `autos.json`)

## 15. ¿Qué marcas de autos están disponibles en el `MarcasService`?
**R:** El servicio proporciona 10 marcas: Toyota, Honda, Ford, Chevrolet, Nissan, BMW, Mercedes-Benz, Audi, Volkswagen y Hyundai. El método `getMarcas()` devuelve este array de strings que puede usarse para poblar filtros o selects.

## 16. ¿Cómo funciona el método `filtrarAutos()` en `AutoListaComponent`?
**R:** Aplica filtros de forma secuencial y acumulativa:
1. Parte de todos los autos cargados
2. Filtra por marca si hay una seleccionada (comparación exacta)
3. Filtra por texto de búsqueda (búsqueda parcial case-insensitive en marca)
4. Filtra por rango de precio (entre precioMin y precioMax)
5. Filtra por kilometraje máximo
6. Actualiza el signal `autosFiltrados` con el resultado

## 17. ¿Qué pipes se utilizan en los componentes para formateo de datos?
**R:** Se utiliza principalmente el `DecimalPipe` de Angular importado desde `@angular/common`. Este pipe se usa para formatear números como precios y kilometraje, mostrándolos con separadores de miles para mejor legibilidad (ej: 25,000 en lugar de 25000).

## 18. ¿Qué diferencia hay entre el método `getAutos()` y `getAutoById()` del `AutoService`?
**R:** 
- **getAutos()**: Retorna todo el array de autos, usa caché, y si no hay caché hace una petición HTTP completa
- **getAutoById(id)**: Retorna un solo auto o `undefined`. Si hay caché busca directamente con `find()`, si no hay caché primero llama a `getAutos()` internamente y luego busca el auto específico con `map()`

## 19. ¿Qué ventajas tiene usar signals en lugar de observables tradicionales para los filtros?
**R:** Los signals ofrecen:
- **Sintaxis más simple**: `marcaSeleccionada()` para leer, `.set()` para escribir
- **Reactividad granular**: Solo se ejecutan efectos cuando el valor realmente cambia
- **Mejor rendimiento**: Change detection más eficiente
- **Debugging más fácil**: El flujo de datos es más explícito
- **TypeScript-friendly**: Mejor inferencia de tipos sin operadores RxJS

## 20. ¿Qué mejoras futuras podrían implementarse en este proyecto?
**R:** Posibles mejoras incluyen:
- Agregar más filtros (por año, color, rango de kilometraje)
- Implementar ordenamiento (por precio, año, kilometraje)
- Añadir paginación para manejar grandes cantidades de autos
- Implementar favoritos con LocalStorage
- Agregar comparador de autos
- Integrar con una API real de backend
- Implementar sistema de búsqueda avanzada con múltiples criterios combinados
- Agregar animaciones en transiciones y filtrado
- Incluir formulario de contacto para cada auto
- Implementar vista de mapa con ubicación de autos disponibles
