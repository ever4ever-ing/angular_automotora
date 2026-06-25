import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Filtro } from '../../services/filtro';

@Component({
  selector: 'app-filtros-autos',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './filtros-autos.html',
  styleUrl: './filtros-autos.css',
})
export class FiltrosAutos {
  precioMin = 0;
  precioMax = 100000;
  kilometrajeMax = 200000;

  constructor(private filtroService: Filtro) {
    // Sincronizar con el servicio
    this.precioMin = this.filtroService.precioMin();
    this.precioMax = this.filtroService.precioMax();
    this.kilometrajeMax = this.filtroService.kilometrajeMax();
  }

  onPrecioMinChange(): void {
    this.filtroService.setPrecioMin(this.precioMin);
  }

  onPrecioMaxChange(): void {
    this.filtroService.setPrecioMax(this.precioMax);
  }

  onKilometrajeChange(): void {
    this.filtroService.setKilometrajeMax(this.kilometrajeMax);
  }

  resetFiltros(): void {
    this.precioMin = 0;
    this.precioMax = 100000;
    this.kilometrajeMax = 200000;
    this.filtroService.resetFiltros();
  }
}
