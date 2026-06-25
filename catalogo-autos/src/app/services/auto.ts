import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError, tap, map } from 'rxjs/operators';
import { Auto } from '../models/auto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private http = inject(HttpClient);
  private autosCache: Auto[] = [];
  private readonly JSON_URL = '/autos.json';

  getAutos(): Observable<Auto[]> {
    console.log('getAutos llamado, cache length:', this.autosCache.length);
    
    // Si ya tenemos los datos en cache, retornarlos
    if (this.autosCache.length > 0) {
      console.log('Retornando desde cache');
      return of(this.autosCache).pipe(delay(300)); // Simular delay de red
    }

    // Cargar desde el archivo JSON simulando una llamada a API
    console.log('Cargando desde JSON:', this.JSON_URL);
    return this.http.get<Auto[]>(this.JSON_URL).pipe(
      tap(autos => {
        console.log('Datos recibidos del JSON:', autos.length, 'autos');
        this.autosCache = autos;
      }),
      delay(500), // Simular latencia de red
      catchError(error => {
        console.error('Error al cargar autos:', error);
        return of([]);
      })
    );
  }

  getAutoById(id: number): Observable<Auto | undefined> {
    console.log('getAutoById llamado con id:', id, 'cache length:', this.autosCache.length);
    
    // Si hay datos en cache, buscar directamente
    if (this.autosCache.length > 0) {
      const auto = this.autosCache.find(a => a.id === id);
      console.log('Auto encontrado en cache:', auto ? 'Sí' : 'No');
      return of(auto).pipe(delay(100));
    }

    // Si no hay cache, cargar primero los autos y luego buscar
    console.log('Cache vacío, cargando todos los autos primero');
    return this.getAutos().pipe(
      map(autos => {
        const auto = autos.find(a => a.id === id);
        console.log('Auto encontrado después de cargar:', auto ? 'Sí - ' + auto.marca + ' ' + auto.modelo : 'No');
        return auto;
      })
    );
  }

  agregarAuto(auto: Auto): void {
    this.autosCache.push(auto);
  }
}