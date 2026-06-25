import { Component, OnInit, effect, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auto } from '../../models/auto';
import { AutoService } from '../../services/auto';
import { Filtro } from '../../services/filtro';

@Component({
  selector: 'app-auto-lista',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './auto-lista.html',
  styleUrls: ['./auto-lista.css']
})
export class AutoListaComponent implements OnInit {
  autos = signal<Auto[]>([]);
  autosFiltrados = signal<Auto[]>([]);

  constructor(
    private autoService: AutoService,
    private filtroService: Filtro
  ) {
    // Reaccionar a cambios en todos los filtros
    effect(() => {
      const marca = this.filtroService.marcaSeleccionada();
      const busqueda = this.filtroService.textoBusqueda();
      const precioMin = this.filtroService.precioMin();
      const precioMax = this.filtroService.precioMax();
      const kmMax = this.filtroService.kilometrajeMax();
      this.filtrarAutos();
    });
  }

  ngOnInit(): void {
    this.autoService.getAutos().subscribe(autos => {
      console.log('Autos cargados en auto-lista:', autos.length);
      this.autos.set(autos);
      this.filtrarAutos();
    });
  }

  private filtrarAutos(): void {
    let resultado = this.autos();
    
    const marca = this.filtroService.marcaSeleccionada();
    const busqueda = this.filtroService.textoBusqueda();
    const precioMin = this.filtroService.precioMin();
    const precioMax = this.filtroService.precioMax();
    const kmMax = this.filtroService.kilometrajeMax();

    // Filtrar por marca seleccionada en sidebar
    if (marca !== '') {
      resultado = resultado.filter(auto => auto.marca === marca);
    }

    // Filtrar por texto de búsqueda
    if (busqueda !== '') {
      resultado = resultado.filter(auto => 
        auto.marca.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por rango de precio
    resultado = resultado.filter(auto => 
      auto.precio >= precioMin && auto.precio <= precioMax
    );

    // Filtrar por kilometraje máximo
    resultado = resultado.filter(auto => 
      auto.kilometraje <= kmMax
    );

    console.log('Autos filtrados:', resultado.length);
    this.autosFiltrados.set(resultado);
  }
}