import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importaciones correctas subiendo un nivel
import { ventasBas } from '../ventasBas'; 
import { ProyectoapiService } from '../ventasapi.service'; 
import { VentasFilterPipe } from '../ventas-filter.pipe'; 

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    VentasFilterPipe,
    CommonModule
  ],
  templateUrl: './ventas.html',
})
export class Ventas implements OnInit {

  listFilter: string = '';
  ventaTitle!: string;
  dataSource: ventasBas[] = [];
  totalAcumulado: number = 0; 

  constructor(
    public pizzeriaService: ProyectoapiService, // Inyectamos tu servicio correctamente
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.cargarVentas();  
  }

  cargarVentas(): void {
    this.pizzeriaService.getVentas().subscribe({
      next: (response: any) => {
        // Asignamos el arreglo de ventas que viene de Flask
        this.dataSource = response.ventas || []; 
        this.totalAcumulado = 0; // Reiniciamos el total acumulado
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Error al consultar el API', error);
      }
    });
  }

  verDetalleVenta(idventa: number | string | undefined): void {
    if (idventa !== undefined) {
      this.router.navigate(['/pizzeria/editar', idventa]); // Apunta a la ruta de edición/detalle
    }
  }

  eliminarVenta(idventa: number | string | undefined): void {
    if (idventa !== undefined) {
      this.router.navigate(['/pizzeria/eliminar', idventa]);
    }
  }

  buscarPorFiltro(tipo: string, valor: string): void {
    if (!valor || valor.trim() === '') {
      this.cargarVentas(); 
      return;
    }

    this.pizzeriaService.consultarVentas(tipo, valor.trim()).subscribe({
      next: (response: any) => {
        this.dataSource = response.ventas || [];
        this.totalAcumulado = response.total_acumulado || 0;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(`Error al consultar ventas por ${tipo}:`, error);
        alert(`No se encontraron ventas para el ${tipo}: ${valor}`);
      }
    });
  }
}