import { AlumnosUTL } from '../alumnosUTL';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../alumnosapi.service';
import { Router } from '@angular/router';
import { AlumnoFilterPipe } from '../alumnos-filter.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumnos',
  imports: [
    FormsModule,
    RouterLink,
    AlumnoFilterPipe,
    CommonModule
  ],
  templateUrl: './alumnos.html',
})
export class Alumnos implements OnInit {

  listFilter: string = '';
  alumnoTitle!: string;
  dataSource: AlumnosUTL[] = [];

  constructor(
    public AlumnosUtl: ProyectoapiService, 
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Inyectamos el detector de cambios
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();  
  }

  cargarAlumnos(): void {
    this.AlumnosUtl.getAlumnos().subscribe({
      next: (response: any) => {
        console.log('Respuesta completa de la API:', response);
        this.dataSource = response.alumnos; 
        console.log('dataSource asignado:', this.dataSource);
        
        this.cdr.detectChanges(); // 2. Forzamos a Angular a actualizar la vista de inmediato
      },
      error: (error) => {
        console.error('Error al consultar el API', error);
      },
      complete: () => {
        console.log('Carga de alumnos finalizada');
      }
    });
  }
}