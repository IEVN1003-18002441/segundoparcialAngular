  import { Component, signal, OnInit } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { initFlowbite } from 'flowbite';
 
  import { Zodiaco } from './formularios/zodiaco/zodiaco';
import { Navbar } from './formularios/navbar/navbar';
import { Distancia } from './formularios/distancia/distancia';
import { ListaEscuela } from './escuela/lista-escuela/lista-escuela';

  @Component({
    imports: [RouterOutlet, Zodiaco, Navbar, Distancia, ListaEscuela],
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