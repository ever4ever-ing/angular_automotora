import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarAutos } from '../sidebar-autos/sidebar-autos';
import { FiltrosAutos } from '../filtros-autos/filtros-autos';
import { Filtro } from '../../services/filtro';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarAutos, FormsModule, FiltrosAutos],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  textoBusqueda = '';

  constructor(private filtroService: Filtro) {}

  onMarcaSeleccionada(marca: string): void {
    this.filtroService.setMarca(marca);
  }

  onBuscar(): void {
    this.filtroService.setBusqueda(this.textoBusqueda);
  }
}
