# Catálogo de Autos - Angular 17+

Aplicación web de catálogo de vehículos desarrollada con Angular 17+, que implementa funcionalidades de búsqueda, filtrado y visualización detallada de automóviles.

## 📋 Descripción General

Este proyecto es una aplicación SPA (Single Page Application) que simula un catálogo de vehículos con las siguientes características:

- **Listado de vehículos** con vista en tarjetas (cards)
- **Sistema de filtrado avanzado** por marca, precio y kilometraje
- **Búsqueda en tiempo real** por nombre de marca
- **Vista de detalle** individual de cada vehículo con carrusel de imágenes
- **Navegación fluida** con enrutamiento de Angular
- **Diseño responsivo** con CSS Grid
- **Carga simulada de datos** desde archivo JSON (simulando una API)

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/app/
├── components/
│   ├── auto-detalle/         # Vista detallada de un vehículo
│   ├── auto-lista/           # Grilla con todos los vehículos
│   ├── filtros-autos/        # Panel de filtros (precio, km)
│   ├── layout/               # Contenedor principal con grid
│   └── sidebar-autos/        # Barra lateral con marcas
├── models/
│   └── auto.ts              # Interfaz del modelo Auto
├── services/
│   ├── auto.ts              # Servicio HTTP para obtener vehículos
│   ├── filtro.ts            # Servicio de estado para filtros
│   └── marcas.ts            # Servicio para obtener marcas únicas
└── app.routes.ts            # Configuración de rutas
```

### Patrón de Diseño

La aplicación utiliza:
- **Componentes standalone** (Angular 17+)
- **Signals** para manejo de estado reactivo
- **Services con inyección de dependencia** para lógica de negocio
- **Observables (RxJS)** para operaciones asíncronas
- **Lazy loading** a través de rutas

## 🧩 Componentes Principales

### 1. Layout Component (`layout/`)

**Propósito**: Contenedor principal que define la estructura de la aplicación usando CSS Grid.

**Estructura**:
```
┌─────────────────────────────┐
│        HEADER               │
│  (Buscador)                 │
├──────────┬──────────┬───────┤
│ SIDEBAR  │   BODY   │ RIGHT │
│ (Marcas) │ (Autos)  │(Filtro│
│          │          │ s)    │
└──────────┴──────────┴───────┘
│        FOOTER               │
└─────────────────────────────┘
```

**Funcionalidades**:
- Renderiza el header con buscador
- Incluye `SidebarAutos` para filtrado por marca
- Contiene `<router-outlet>` para renderizar rutas hijas
- Incluye `FiltrosAutos` para rangos de precio y kilometraje

**Código clave**:
```typescript
export class Layout {
  textoBusqueda = '';
  
  constructor(private filtroService: Filtro) {}
  
  onBuscar(): void {
    this.filtroService.setTextoBusqueda(this.textoBusqueda);
  }
  
  onMarcaSeleccionada(marca: string): void {
    this.filtroService.setMarcaSeleccionada(marca);
  }
}
```

### 2. Auto Lista Component (`auto-lista/`)

**Propósito**: Muestra la grilla de vehículos disponibles aplicando todos los filtros activos.

**Características**:
- Usa **signals** para manejo reactivo del estado
- Implementa **effect()** para reaccionar automáticamente a cambios en filtros
- Aplica filtrado combinado (marca + búsqueda + precio + kilometraje)
- Muestra información básica de cada vehículo

**Lógica de filtrado**:
```typescript
private filtrarAutos(): void {
  let resultado = this.autos();
  
  // Filtro por marca
  if (marca !== '') {
    resultado = resultado.filter(auto => auto.marca === marca);
  }
  
  // Filtro por búsqueda
  if (busqueda !== '') {
    resultado = resultado.filter(auto => 
      auto.marca.toLowerCase().includes(busqueda.toLowerCase())
    );
  }
  
  // Filtro por rango de precio
  resultado = resultado.filter(auto => 
    auto.precio >= precioMin && auto.precio <= precioMax
  );
  
  // Filtro por kilometraje
  resultado = resultado.filter(auto => 
    auto.kilometraje <= kmMax
  );
  
  this.autosFiltrados.set(resultado);
}
```

**Template**:
```html
@for (auto of autosFiltrados(); track auto.id) {
  <div class="auto-card">
    <img [src]="auto.imagen" [alt]="auto.marca + ' ' + auto.modelo">
    <h3>{{auto.marca}} {{auto.modelo}}</h3>
    <p>Año: {{auto.anio}}</p>
    <p>Precio: ${{auto.precio | number}}</p>
    <button [routerLink]="['/auto', auto.id]">Ver Detalles</button>
  </div>
}
```

### 3. Auto Detalle Component (`auto-detalle/`)

**Propósito**: Vista detallada de un vehículo específico con carrusel de imágenes.

**Características**:
- Obtiene el ID del vehículo desde los parámetros de ruta
- Carga los datos del vehículo desde el servicio
- Implementa carrusel de imágenes con navegación
- Muestra estado de carga mientras obtiene los datos

**Funcionalidad del carrusel**:
```typescript
siguienteImagen(): void {
  const autoActual = this.auto();
  if (autoActual?.imagenes) {
    this.imagenActual.set(
      (this.imagenActual() + 1) % autoActual.imagenes.length
    );
  }
}

imagenAnterior(): void {
  const autoActual = this.auto();
  if (autoActual?.imagenes) {
    this.imagenActual.set(
      this.imagenActual() === 0 
        ? autoActual.imagenes.length - 1 
        : this.imagenActual() - 1
    );
  }
}
```

**Navegación**:
```typescript
ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  
  this.autoService.getAutoById(id).subscribe({
    next: (auto) => {
      this.auto.set(auto);
      this.cargando.set(false);
    },
    error: () => {
      this.router.navigate(['/catalogo']);
    }
  });
}
```

### 4. Sidebar Autos Component (`sidebar-autos/`)

**Propósito**: Lista de marcas para filtrar vehículos.

**Características**:
- Obtiene marcas únicas desde el servicio `MarcasService`
- Emite evento cuando se selecciona una marca
- Permite limpiar filtro con opción "Todas las marcas"

**Comunicación con padre**:
```typescript
@Output() marcaSeleccionada = new EventEmitter<string>();

seleccionarMarca(marca: string): void {
  this.marcaActual = marca;
  this.marcaSeleccionada.emit(marca);
}
```

### 5. Filtros Autos Component (`filtros-autos/`)

**Propósito**: Panel con controles de rango para precio y kilometraje.

**Características**:
- Sliders HTML5 (`<input type="range">`)
- Actualización en tiempo real del servicio de filtros
- Muestra valores actuales mientras se ajustan

**Interacción**:
```typescript
onPrecioMinChange(value: string): void {
  this.filtroService.setPrecioMin(Number(value));
}

onKilometrajeMaxChange(value: string): void {
  this.filtroService.setKilometrajeMax(Number(value));
}
```

## 🔧 Servicios

### 1. Auto Service (`services/auto.ts`)

**Propósito**: Gestionar la obtención de datos de vehículos.

**Características**:
- Utiliza **HttpClient** para cargar datos desde JSON
- Implementa **caché en memoria** para optimizar rendimiento
- Simula latencia de red con operador `delay()`
- Maneja errores con operador `catchError()`

**Métodos principales**:

```typescript
getAutos(): Observable<Auto[]> {
  // Si ya hay datos en caché, retornarlos
  if (this.autosCache.length > 0) {
    return of(this.autosCache).pipe(delay(300));
  }
  
  // Cargar desde JSON
  return this.http.get<Auto[]>(this.JSON_URL).pipe(
    tap(autos => this.autosCache = autos),
    delay(500), // Simular latencia
    catchError(error => {
      console.error('Error al cargar autos:', error);
      return of([]);
    })
  );
}

getAutoById(id: number): Observable<Auto | undefined> {
  // Buscar en caché o cargar primero
  if (this.autosCache.length > 0) {
    return of(this.autosCache.find(a => a.id === id));
  }
  
  return this.getAutos().pipe(
    map(autos => autos.find(a => a.id === id))
  );
}
```

### 2. Filtro Service (`services/filtro.ts`)

**Propósito**: Mantener el estado global de todos los filtros usando signals.

**Ventajas de usar Signals**:
- Reactividad automática sin necesidad de subscripciones
- Mejor rendimiento que Subject/BehaviorSubject
- Sintaxis más limpia y menos código boilerplate

**Implementación**:
```typescript
@Injectable({ providedIn: 'root' })
export class Filtro {
  // Signals para cada filtro
  marcaSeleccionada = signal<string>('');
  textoBusqueda = signal<string>('');
  precioMin = signal<number>(0);
  precioMax = signal<number>(100000);
  kilometrajeMax = signal<number>(300000);
  
  // Métodos para actualizar
  setMarcaSeleccionada(marca: string): void {
    this.marcaSeleccionada.set(marca);
  }
  
  setTextoBusqueda(texto: string): void {
    this.textoBusqueda.set(texto);
  }
  
  // ... más setters
}
```

### 3. Marcas Service (`services/marcas.ts`)

**Propósito**: Obtener lista única de marcas disponibles.

**Implementación**:
```typescript
getMarcasUnicas(): Observable<string[]> {
  return this.autoService.getAutos().pipe(
    map(autos => {
      const marcas = new Set(autos.map(auto => auto.marca));
      return Array.from(marcas).sort();
    })
  );
}
```

## 📊 Modelo de Datos

### Interfaz Auto

```typescript
export interface Auto {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  imagen: string;
  imagenes?: string[];  // Array para carrusel
  color: string;
  kilometraje: number;
  descripcion?: string;
}
```

### Datos de Ejemplo (`public/autos.json`)

```json
[
  {
    "id": 1,
    "marca": "Toyota",
    "modelo": "Corolla",
    "anio": 2023,
    "precio": 25000,
    "imagen": "https://images.unsplash.com/...",
    "imagenes": [
      "https://images.unsplash.com/...",
      "https://images.unsplash.com/...",
      "https://images.unsplash.com/..."
    ],
    "color": "Blanco",
    "kilometraje": 15000,
    "descripcion": "Sedán confiable con excelente rendimiento..."
  }
]
```

## 🛣️ Sistema de Rutas

### Configuración (`app.routes.ts`)

```typescript
export const routes: Routes = [
  { 
    path: '', 
    component: Layout,
    children: [
      { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
      { path: 'catalogo', component: AutoListaComponent },
      { path: 'auto/:id', component: AutoDetalle }
    ]
  }
];
```

**Estructura de URLs**:
- `/` → Redirige a `/catalogo`
- `/catalogo` → Lista de vehículos
- `/auto/1` → Detalle del vehículo con ID 1

**Navegación programática**:
```typescript
// En un componente
this.router.navigate(['/auto', autoId]);

// En el template
<button [routerLink]="['/auto', auto.id]">Ver Detalles</button>
```

## 🎨 Características de Angular 17+

### 1. Componentes Standalone

Todos los componentes son standalone, eliminando la necesidad de NgModule:

```typescript
@Component({
  selector: 'app-auto-lista',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './auto-lista.html',
  styleUrls: ['./auto-lista.css']
})
```

### 2. Nueva Sintaxis de Control Flow

Reemplaza directivas estructurales con sintaxis más limpia:

**Antes (Angular <17)**:
```html
<div *ngIf="cargando">Cargando...</div>
<div *ngFor="let auto of autos">{{auto.marca}}</div>
```

**Ahora (Angular 17+)**:
```html
@if (cargando()) {
  <div>Cargando...</div>
}

@for (auto of autosFiltrados(); track auto.id) {
  <div>{{auto.marca}}</div>
}
```

### 3. Signals

Reactividad moderna sin RxJS Subject:

```typescript
// Crear signal
auto = signal<Auto | undefined>(undefined);

// Leer valor
const autoActual = this.auto();

// Actualizar valor
this.auto.set(nuevoAuto);

// En template
<h2>{{auto()!.marca}}</h2>
```

### 4. Effect para Reactividad

Ejecutar código cuando signals cambian:

```typescript
constructor() {
  effect(() => {
    const marca = this.filtroService.marcaSeleccionada();
    const precio = this.filtroService.precioMax();
    // Se ejecuta automáticamente cuando cambian estos signals
    this.filtrarAutos();
  });
}
```

## 🔄 Flujo de Datos

### 1. Carga Inicial

```
Usuario → Layout (ngOnInit)
  ↓
AutoListaComponent (ngOnInit)
  ↓
AutoService.getAutos()
  ↓
HttpClient → public/autos.json
  ↓
Observable<Auto[]>
  ↓
autos.set(datos) [Signal]
  ↓
Template actualizado automáticamente
```

### 2. Filtrado por Marca

```
Usuario click marca en Sidebar
  ↓
marcaSeleccionada.emit(marca) [Output]
  ↓
Layout.onMarcaSeleccionada(marca)
  ↓
FiltroService.setMarcaSeleccionada(marca)
  ↓
marcaSeleccionada.set(marca) [Signal]
  ↓
effect() en AutoListaComponent detecta cambio
  ↓
filtrarAutos() ejecutado
  ↓
autosFiltrados.set(resultado) [Signal]
  ↓
Template actualizado automáticamente
```

### 3. Búsqueda en Header

```
Usuario escribe en input
  ↓
[(ngModel)]="textoBusqueda" [Two-way binding]
  ↓
(keyup)="onBuscar()"
  ↓
FiltroService.setTextoBusqueda(texto)
  ↓
textoBusqueda.set(texto) [Signal]
  ↓
effect() detecta cambio
  ↓
Filtrado automático
```

### 4. Navegación a Detalle

```
Usuario click "Ver Detalles"
  ↓
[routerLink]="['/auto', auto.id]"
  ↓
Router navega a /auto/1
  ↓
AutoDetalle (ngOnInit)
  ↓
route.snapshot.paramMap.get('id')
  ↓
AutoService.getAutoById(1)
  ↓
Observable<Auto>
  ↓
auto.set(datos) [Signal]
  ↓
Template muestra detalle + carrusel
```

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Filtrado Múltiple

1. **Por Marca** (Sidebar)
   - Click en marca filtra instantáneamente
   - Opción "Todas" limpia el filtro

2. **Por Búsqueda** (Header)
   - Búsqueda en tiempo real mientras escribes
   - Busca en nombre de marca (case-insensitive)

3. **Por Precio** (Panel derecho)
   - Slider doble (mínimo y máximo)
   - Rango: $0 - $100,000

4. **Por Kilometraje** (Panel derecho)
   - Slider simple (máximo)
   - Rango: 0 - 300,000 km

**Todos los filtros se aplican simultáneamente** (AND lógico).

### ✅ Carrusel de Imágenes

- Navegación con flechas (← →)
- Miniaturas clickeables
- Indicador visual de imagen activa
- Navegación circular (última → primera)

### ✅ Carga Simulada (Loading States)

```typescript
@if (cargando()) {
  <div class="cargando">
    <h2>Cargando vehículo...</h2>
  </div>
}
```

### ✅ Manejo de Errores

- Redirección automática si vehículo no existe
- Mensaje "Vehículo no encontrado"
- Manejo de errores en llamadas HTTP

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js 18+ 
- npm 9+
- Angular CLI 17+

### Pasos de Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
ng serve

# 3. Abrir en navegador
# http://localhost:4200
```

### Comandos Disponibles

```bash
# Desarrollo
ng serve                    # Servidor con hot-reload
ng serve --open            # Abre automáticamente el navegador

# Construcción
ng build                   # Build de producción
ng build --configuration development  # Build de desarrollo

# Testing
ng test                    # Ejecuta tests unitarios
ng e2e                     # Tests end-to-end

# Generación de código
ng generate component nombre    # Nuevo componente
ng generate service nombre      # Nuevo servicio
```

## 📦 Dependencias Principales

```json
{
  "@angular/animations": "^17.x",
  "@angular/common": "^17.x",
  "@angular/core": "^17.x",
  "@angular/forms": "^17.x",
  "@angular/platform-browser": "^17.x",
  "@angular/router": "^17.x",
  "rxjs": "^7.x",
  "tslib": "^2.x",
  "zone.js": "^0.14.x"
}
```

## 🎨 Estilos y Diseño

### Layout con CSS Grid

```css
.layout-grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "leftSide body rightSide"
    "footer footer footer";
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### Responsividad

- **Desktop**: Grid completo con 3 columnas
- **Tablet**: Sidebar colapsable
- **Mobile**: Layout vertical apilado

## 🔍 Buenas Prácticas Implementadas

1. **Componentes Standalone**: Modularidad y lazy loading
2. **Signals**: Reactividad eficiente sin subscripciones manuales
3. **Services con inyección**: Separación de lógica de negocio
4. **Caché de datos**: Reduce llamadas HTTP redundantes
5. **TypeScript estricto**: Tipado fuerte para prevenir errores
6. **OnPush Change Detection**: Mejor rendimiento (implícito con signals)
7. **Track By en loops**: Optimización de renderizado de listas
8. **Lazy Loading**: Componentes cargados bajo demanda
9. **Error Handling**: Manejo robusto de errores
10. **Código limpio**: Nombres descriptivos, funciones pequeñas

## 🐛 Troubleshooting

### Problema: No se muestran los autos

**Solución**:
```bash
# Verificar que existe public/autos.json
# Limpiar caché de Angular
rm -rf .angular
ng serve
```

### Problema: Filtros no funcionan

**Solución**:
- Verificar que `FiltroService` esté inyectado correctamente
- Revisar que el `effect()` esté en el constructor
- Comprobar console para errores

### Problema: Imágenes no cargan

**Solución**:
- Verificar URLs de Unsplash en `autos.json`
- Comprobar conexión a internet
- Revisar consola del navegador (CORS, 404)

## 📝 Próximas Mejoras Sugeridas

- [ ] Paginación de resultados
- [ ] Ordenamiento (precio, año, km)
- [ ] Favoritos con LocalStorage
- [ ] Comparador de vehículos
- [ ] Formulario de contacto
- [ ] Autenticación de usuarios
- [ ] Panel de administración (CRUD)
- [ ] Tests unitarios completos
- [ ] Tests E2E con Playwright
- [ ] PWA (Progressive Web App)
- [ ] SSR con Angular Universal
- [ ] Internacionalización (i18n)

## 👨‍💻 Desarrollador

Proyecto educativo desarrollado como práctica de Angular 17+.

## 📄 Licencia

MIT

---

**Última actualización**: Enero 2026
**Angular Version**: 17+
**Node Version**: 18+