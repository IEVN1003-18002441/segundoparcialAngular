  import { Component, signal, OnInit } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { initFlowbite } from 'flowbite';
 
  import { Zodiaco } from './formularios/zodiaco/zodiaco';
import { Navbar } from './formularios/navbar/navbar';
import { Distancia } from './formularios/distancia/distancia';
import { ListaEscuela } from './escuela/lista-escuela/lista-escuela';
import { Cinepolis } from './escuela/cinepolis/cinepolis';
import { Ventas } from './escuela/ventas/ventas';

  @Component({
    imports: [RouterOutlet, Zodiaco, Navbar, Distancia, ListaEscuela,Cinepolis, Ventas],
    selector: 'app-root',
    styleUrl: './app.css',
    templateUrl: './app.html',
  })
  export class App implements OnInit {
    protected readonly title = signal('segundoparcialAngular');

    ngOnInit(): void {
      initFlowbite();
    }
}