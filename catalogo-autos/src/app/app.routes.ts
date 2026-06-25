import { Routes } from '@angular/router';
import { AutoListaComponent } from './components/auto-lista/auto-lista';
import { AutoDetalle } from './components/auto-detalle/auto-detalle';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
  { 
    path: '', 
    component: Layout,
    children: [
      { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
      { path: 'catalogo', component: AutoListaComponent },
      { path: 'auto/:id', component: AutoDetalle } // Ruta dirige a detalle del auto
    ]
  }
];