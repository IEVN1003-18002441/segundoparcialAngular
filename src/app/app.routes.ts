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
    loadComponent: () => import('./escuela/lista-escuela/lista-escuela').then((c) => c.ListaEscuela),
    title: 'Lista de Alumnos | SegundoparcialAngular',
  },
  {
    path: 'ventas',
    loadComponent: () => import('./escuela/ventas/ventas').then((c) => c.Ventas),
    title: 'Ventas | SegundoparcialAngular',
  },
  {
    path: 'utl',
    children:[
      // ================= ALUMNOS =================
      {
        path: 'alumnos',
        loadComponent: () => import('./utl/abcalumnos/alumnos/alumnos').then((c) => c.Alumnos),
        title: 'Alumnos UTL | SegundoparcialAngular',
      },
      {
        path: 'agregar',
        loadComponent: () => import('./utl/abcalumnos/agregar/agregar').then((c) => c.Agregar),
        title: 'Agregar Alumno | SegundoparcialAngular',
      },
      {
        path: 'editar/:matricula',
        loadComponent: () => import('./utl/abcalumnos/editar/editar').then((c) => c.Editar),
        title: 'Editar Alumno | SegundoparcialAngular',
      },
      {
        path: 'eliminar/:matricula',
        loadComponent: () => import('./utl/abcalumnos/eliminar/eliminar').then((c) => c.Eliminar),
        title: 'Eliminar Alumno | SegundoparcialAngular',
      },
     
      // ================= MAESTROS =================
      {
        path: 'maestros',
        loadComponent: () => import('./utl/abcmaestros/maestros/maestros').then((c) => c.Maestros),
        title: 'Maestros UTL | SegundoparcialAngular',
      },
      {
        path: 'agregar-maestro', // <-- RUTA CORREGIDA
        loadComponent: () => import('./utl/abcmaestros/agregar/agregar').then((c) => c.Agregar),
        title: 'Agregar Maestro | SegundoparcialAngular',
      },
      {
        path: 'editar-maestro/:idmaestro', // <-- RUTA CORREGIDA
        loadComponent: () => import('./utl/abcmaestros/editar/editar').then((c) => c.Editar),
        title: 'Editar Maestro | SegundoparcialAngular',
      },
      {
        path: 'eliminar-maestro/:idmaestro', // <-- RUTA CORREGIDA
        loadComponent: () => import('./utl/abcmaestros/eliminar/eliminar').then((c) => c.Eliminar),
        title: 'Eliminar Maestro | SegundoparcialAngular',
      }
    ]
  },
  {
    path: 'cinepolis',
    loadComponent: () => import('./escuela/cinepolis/cinepolis').then((c) => c.Cinepolis),
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