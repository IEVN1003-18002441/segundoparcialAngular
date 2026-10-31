import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'formularios',
    children: [
      {
        path: 'zodiaco',
        loadComponent: () => import('./formularios/zodiaco/zodiaco').then((c) => c.Zodiaco),
        title: 'Zodíaco | SegundoparcialAngular',
      },
      {
        path: 'distancia',
        loadComponent: () => import('./formularios/distancia/distancia').then((c) => c.Distancia),
        title: 'Distancia | SegundoparcialAngular',
      },
    ],
  },
  {
    path: 'lista-escuela',
    loadComponent: () =>
      import('./escuela/lista-escuela/lista-escuela').then((c) => c.ListaEscuela),
    title: 'Lista de Alumnos | SegundoparcialAngular',
  },
  {
    path: 'ventas',
    loadComponent: () =>
      import('./escuela/ventas/ventas').then((c) => c.Ventas),
    title: 'Ventas | SegundoparcialAngular',
  },
  {
    path: 'utl',
    children:[
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./utl/abcalumnos/alumnos/alumnos').then((c) => c.Alumnos),
        title: 'Alumnos UTL | SegundoparcialAngular',
      },
      {
        path: 'maestros',
        loadComponent: () =>
          import('./utl/abcmaestros/maestros/maestros').then((c) => c.Maestros),
        title: 'Maestros UTL | SegundoparcialAngular',
      }
    ]
  },
  {
    path: 'cinepolis',
    loadComponent: () =>
      import('./escuela/cinepolis/cinepolis').then((c) => c.Cinepolis),
    title: 'Cinépolis | SegundoparcialAngular',
  },
  {
    path: 'escuela',
    children: [
      {
        path: 'ventas',
        loadComponent: () => import('./escuela/ventas/ventas').then((c) => c.Ventas),
        title: 'Ventas Escuela | SegundoparcialAngular',
      },
    ],
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full', title: 'Inicio | SegundoparcialAngular' },
  { path: '**', redirectTo: 'admin', pathMatch: 'full' },
];