import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Filtro {
  marcaSeleccionada = signal<string>('');
  textoBusqueda = signal<string>('');
  precioMin = signal<number>(0);
  precioMax = signal<number>(100000);
  kilometrajeMax = signal<number>(200000);

  setMarca(marca: string): void {
    this.marcaSeleccionada.set(marca);
  }

  clearMarca(): void {
    this.marcaSeleccionada.set('');
  }

  setBusqueda(texto: string): void {
    this.textoBusqueda.set(texto);
  }

  clearBusqueda(): void {
    this.textoBusqueda.set('');
  }

  setPrecioMin(precio: number): void {
    this.precioMin.set(precio);
  }

  setPrecioMax(precio: number): void {
    this.precioMax.set(precio);
  }

  setKilometrajeMax(km: number): void {
    this.kilometrajeMax.set(km);
  }

  resetFiltros(): void {
    this.marcaSeleccionada.set('');
    this.textoBusqueda.set('');
    this.precioMin.set(0);
    this.precioMax.set(100000);
    this.kilometrajeMax.set(200000);
  }
}
