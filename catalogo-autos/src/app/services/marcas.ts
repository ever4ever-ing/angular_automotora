import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  private marcas: string[] = [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'Nissan',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Volkswagen',
    'Hyundai',
  ];

  getMarcas(): string[] {
    return this.marcas;
  }
  
}
