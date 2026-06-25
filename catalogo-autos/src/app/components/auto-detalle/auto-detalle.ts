import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Auto } from '../../models/auto';
import { AutoService } from '../../services/auto';
import { AppIcon } from '../app-icon/app-icon';

@Component({
  selector: 'app-auto-detalle',
  standalone: true,
  imports: [DecimalPipe, RouterLink, AppIcon],
  templateUrl: './auto-detalle.html',
  styleUrl: './auto-detalle.css',
})
export class AutoDetalle implements OnInit {
  auto = signal<Auto | undefined>(undefined);
  imagenActual = signal(0);
  cargando = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private autoService: AutoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Buscando auto con ID:', id);
    
    this.autoService.getAutoById(id).subscribe({
      next: (auto) => {
        console.log('Auto recibido:', auto);
        this.auto.set(auto);
        this.cargando.set(false);
        console.log('Estado actualizado - cargando:', this.cargando(), 'auto:', !!this.auto());
        
        if (!this.auto()) {
          console.log('Auto no encontrado, redirigiendo...');
          setTimeout(() => this.router.navigate(['/catalogo']), 2000);
        }
      },
      error: (error) => {
        console.error('Error al cargar auto:', error);
        this.cargando.set(false);
        this.router.navigate(['/catalogo']);
      }
    });
  }

  siguienteImagen(): void {
    const autoActual = this.auto();
    if (autoActual?.imagenes) {
      this.imagenActual.set((this.imagenActual() + 1) % autoActual.imagenes.length);
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

  seleccionarImagen(index: number): void {
    this.imagenActual.set(index);
  }
}
