import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Carousel } from "flowbite";
import type { CarouselItem, CarouselOptions, CarouselInterface } from "flowbite";



@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('segundoparcialAngular');

  // Aquí inicializamos Flowbite cuando el componente carga
  ngOnInit(): void {
    initFlowbite();
  }
}