import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MarcasService } from '../../services/marcas';
import { Filtro } from '../../services/filtro';

@Component({
  selector: 'app-sidebar-autos',
  imports: [],
  templateUrl: './sidebar-autos.html',
  styleUrl: './sidebar-autos.css',
})
export class SidebarAutos implements OnInit {
  private marcaService = inject(MarcasService);
  filtroService = inject(Filtro);

  marcas: string[] = [];
  @Output() marcaSeleccionada = new EventEmitter<string>();

  ngOnInit(): void {
    this.marcas = this.marcaService.getMarcas();
  }

  seleccionarMarca(marca: string): void {
    this.marcaSeleccionada.emit(marca);
  }

  mostrarTodos(): void {
    this.marcaSeleccionada.emit('');
  }

  isActive(marca: string): boolean {
    return this.filtroService.marcaSeleccionada() === marca;
  }
}
