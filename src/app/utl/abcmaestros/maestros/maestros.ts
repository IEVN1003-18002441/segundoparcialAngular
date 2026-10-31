import { MaestrosUTL } from '../maestrosUTL';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../maestrosapi.service';
import { Router } from '@angular/router';
import { MaestroFilterPipe } from '../maestros-filter.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maestros',
  imports: [
    FormsModule,
    RouterLink,
    MaestroFilterPipe,
    CommonModule
  ],
  templateUrl: './maestros.html',
})
export class Maestros implements OnInit {

  listFilter: string = '';
  maestroTitle!: string;
  dataSource: MaestrosUTL[] = [];

  constructor(
    public MaestrosUTL: ProyectoapiService, 
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Inyectamos el detector de cambios
  ) {}

  ngOnInit(): void {
    this.cargarMaestros();  
  }

  cargarMaestros(): void {
    this.MaestrosUTL.getMaestros().subscribe({
      next: (response: any) => {
        console.log('Respuesta completa de la API:', response);
        this.dataSource = response.maestros; 
        console.log('dataSource asignado:', this.dataSource);
        
        this.cdr.detectChanges(); // 2. Forzamos a Angular a actualizar la vista de inmediato
      },
      error: (error) => {
        console.error('Error al consultar el API', error);
      },
      complete: () => {
        console.log('Carga de maestros finalizada');
      }
    });
  }
}