import { MaestrosUTL } from '../maestrosUTL';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from '../maestrosapi.service';
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMaestros();  
  }

  cargarMaestros(): void {
    this.MaestrosUTL.getMaestros().subscribe({
      next: (response: any) => {
        this.dataSource = response.maestros; 
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al consultar el API', error);
      }
    });
  }

  editarMaestro(idmaestro: number | string): void {
    this.router.navigate(['/utl/editar-maestro', idmaestro]); 
  }

  eliminarMaestro(idmaestro: number | string): void {
    this.router.navigate(['/utl/eliminar-maestro', idmaestro]); 
  }
}