import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { SidebarAutos } from '../sidebar-autos/sidebar-autos';
import { FiltrosAutos } from '../filtros-autos/filtros-autos';
import { AppIcon } from '../app-icon/app-icon';
import { Filtro } from '../../services/filtro';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarAutos, FormsModule, FiltrosAutos, AppIcon],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private filtroService = inject(Filtro);
  private router = inject(Router);

  textoBusqueda = '';
  panelMarcasAbierto = signal(false);
  panelFiltrosAbierto = signal(false);

  esDetalle = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects.includes('/auto/')),
      startWith(this.router.url.includes('/auto/'))
    ),
    { initialValue: false }
  );

  filtrosActivos = computed(() => {
    const f = this.filtroService;
    return (
      f.marcaSeleccionada() !== '' ||
      f.textoBusqueda() !== '' ||
      f.precioMin() > 0 ||
      f.precioMax() < 100000 ||
      f.kilometrajeMax() < 200000
    );
  });

  onMarcaSeleccionada(marca: string): void {
    this.filtroService.setMarca(marca);
    this.panelMarcasAbierto.set(false);
  }

  onBuscar(): void {
    this.filtroService.setBusqueda(this.textoBusqueda);
  }

  togglePanelMarcas(): void {
    this.panelFiltrosAbierto.set(false);
    this.panelMarcasAbierto.update(v => !v);
  }

  togglePanelFiltros(): void {
    this.panelMarcasAbierto.set(false);
    this.panelFiltrosAbierto.update(v => !v);
  }

  cerrarPaneles(): void {
    this.panelMarcasAbierto.set(false);
    this.panelFiltrosAbierto.set(false);
  }
}
