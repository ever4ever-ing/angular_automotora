# Instalar Angular CLI (si no lo tienes)
npm install -g @angular/cli

# Crear nuevo proyecto
ng new catalogo-autos
# Selecciona: Yes para routing, CSS para estilos

# Entrar al proyecto
cd catalogo-autos

# Generar componentes necesarios
ng generate component components/auto-lista
ng generate component components/auto-detalle
ng generate component components/auto-form

# Generar servicio
ng generate service services/auto

# Crea src/app/models/auto.ts con la interfaz Auto:
# id, marca, modelo, anio, precio, imagen, imagenes?, color, kilometraje, descripcion?

# Edita src/app/services/auto.ts:
# - getAutos(): carga desde /autos.json con HttpClient, caché en memoria y delay simulado
# - getAutoById(id): busca en caché o carga primero con getAutos()
# - agregarAuto(auto): agrega al caché

# Crea public/autos.json con un array de autos de ejemplo (mínimo 5 vehículos)

# Generar componentes y servicios adicionales
ng generate component components/layout
ng generate component components/filtros-autos
ng generate component components/sidebar-autos
ng generate service services/filtro
ng generate service services/marcas

# Configura src/app/app.config.ts:
# - provideHttpClient() para cargar autos.json
# - provideRouter(routes) para el enrutamiento

# Configura src/app/app.routes.ts:
# - Layout como contenedor con children
# - '' → redirectTo 'catalogo'
# - 'catalogo' → AutoListaComponent
# - 'auto/:id' → AutoDetalle

# Edita src/app/services/filtro.ts:
# - Signals: marcaSeleccionada, textoBusqueda, precioMin, precioMax, kilometrajeMax
# - Métodos: setMarca, clearMarca, setBusqueda, setPrecioMin/Max, setKilometrajeMax, resetFiltros

# Edita src/app/services/marcas.ts:
# - Array con 10 marcas (Toyota, Honda, Ford, etc.)
# - Método getMarcas()

# Edita src/app/components/layout:
# - Incluye SidebarAutos, FiltrosAutos y <router-outlet>
# - Barra de búsqueda que llama a filtroService.setBusqueda()
# - Escucha (marcaSeleccionada) del sidebar

# Edita src/app/components/sidebar-autos:
# - Lista de marcas desde MarcasService
# - Emite marcaSeleccionada al hacer clic
# - Botón "Mostrar todos" emite cadena vacía

# Edita src/app/components/filtros-autos:
# - Sliders/inputs para precio mínimo, precio máximo y kilometraje máximo
# - Sincroniza cambios con el servicio Filtro
# - Botón "Limpiar filtros" llama a resetFiltros()

# Edita src/app/components/auto-lista:
# - Carga autos con autoService.getAutos() en ngOnInit
# - Usa effect() para reaccionar a cambios en los signals del servicio Filtro
# - Método filtrarAutos(): filtra por marca, texto, precio y kilometraje
# - Muestra tarjetas con RouterLink a /auto/:id
# - Usa DecimalPipe para formatear precio y kilometraje

# Edita src/app/components/auto-detalle:
# - Obtiene id desde ActivatedRoute en ngOnInit
# - Carga auto con autoService.getAutoById(id)
# - Si no existe, muestra mensaje y redirige a /catalogo tras 2 segundos
# - Galería con signals: imagenActual, siguienteImagen(), imagenAnterior(), seleccionarImagen()
# - Botón "Volver al catálogo" con RouterLink

# Edita src/app/app.html:
# - Solo <router-outlet />

# Ejecutar la aplicación
ng serve

# Abrir en el navegador
# http://localhost:4200

# Verificar funcionalidad:
# 1. El catálogo muestra la lista de autos
# 2. Los filtros por marca, precio y kilometraje actualizan la lista
# 3. La búsqueda por texto filtra por marca
# 4. Al hacer clic en un auto se muestra el detalle con galería
# 5. Un ID inválido redirige al catálogo

# (Opcional) Ejecutar tests
ng test