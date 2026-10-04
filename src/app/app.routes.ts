import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'formularios', children: [
            {
                path: 'zodiaco',
                loadComponent: () =>
                    import('./formularios/zodiaco/zodiaco').then(
                        (c) => c.Zodiaco
                    )
                       
            },
              {
                path: 'distancia',
                loadComponent: () =>
                    import('./formularios/distancia/distancia').then(
                        (c) => c.Distancia
                    )
                       
            },
            
            
        ]

        
    },
{
     path: 'lista-escuela',
                loadComponent: () =>
                    import('./escuela/lista-escuela/lista-escuela').then(
                        (c) => c.ListaEscuela
                    )
},
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', redirectTo: 'admin', pathMatch: 'full' },


];
