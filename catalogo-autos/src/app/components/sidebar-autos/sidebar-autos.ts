import { Component, EventEmitter, Output } from '@angular/core';
import { MarcasService } from '../../services/marcas';

@Component({
  selector: 'app-sidebar-autos',
  imports: [],
  templateUrl: './sidebar-autos.html',
  styleUrl: './sidebar-autos.css',
})
export class SidebarAutos {
  marcas: string[] = [];
  @Output() marcaSeleccionada = new EventEmitter<string>();

  constructor(private marcaService: MarcasService) {}
  
  ngOnInit(): void {
    this.marcas = this.marcaService.getMarcas();
  }

  seleccionarMarca(marca: string): void {
    this.marcaSeleccionada.emit(marca);
  }

  mostrarTodos(): void {
    this.marcaSeleccionada.emit('');
  }
}
 