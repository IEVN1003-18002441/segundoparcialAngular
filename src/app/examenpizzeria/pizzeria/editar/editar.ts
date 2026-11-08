import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- MUY IMPORTANTE para [(ngModel)]

import { ventasBas, PizzaDetalle } from '../ventasBas'; 
import { ProyectoapiService } from '../ventasapi.service'; 

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // <-- FormsModule agregado aquí
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  
  idventa: number = 0;
  ventaInfo: ventasBas | null = null;
  listaDetallePizzas: PizzaDetalle[] = [];
  
  // Variable para controlar si vemos texto o cajas de edición
  modoEdicion: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    public pizzeriaService: ProyectoapiService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('idventa') || this.route.snapshot.paramMap.get('matricula');
    this.idventa = idParam ? Number(idParam) : 0;

    if (this.idventa > 0) {
      this.cargarDatosVenta(this.idventa);
    }
  }

  cargarDatosVenta(id: number): void {
    // 1. Consultar la información general de la venta
    this.pizzeriaService.getVentas().subscribe({
      next: (response: any) => {
        const ventas: ventasBas[] = response.ventas || [];
        const ventaEncontrada = ventas.find((v: ventasBas) => Number(v.idventa) === Number(id));
        
        // Clonamos los datos para no afectar la tabla general si cancelamos
        this.ventaInfo = ventaEncontrada ? { ...ventaEncontrada } : null;
        this.cdr.detectChanges(); 
      },
      error: (error: any) => {
        console.error('Error al consultar la venta:', error);
      }
    });

    // 2. Consultar el detalle de las pizzas de esta venta
    this.pizzeriaService.getDetalleVenta(id).subscribe({
      next: (response: any) => {
        this.listaDetallePizzas = response.detalles || [];
        this.cdr.detectChanges(); 
      },
      error: (error: any) => {
        console.error('Error al consultar el detalle de pizzas:', error);
      }
    });
  }

  // --- NUEVAS FUNCIONES PARA EL MODO EDICIÓN ---

  activarEdicion(): void {
    this.modoEdicion = true;
    this.cdr.detectChanges(); // Forzamos a que aparezcan los inputs
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.cargarDatosVenta(this.idventa); // Descartamos cambios recargando de la BD
    this.cdr.detectChanges(); // Forzamos a que regrese al texto normal
  }

  guardarCambios(): void {
    if (!this.ventaInfo) return;
    
    // Preparamos solo los datos que Flask espera recibir
    const datos = {
      nombre: this.ventaInfo.nombre,
      direccion: this.ventaInfo.direccion,
      telefono: this.ventaInfo.telefono
    };

    // Llamamos al servicio para actualizar
    this.pizzeriaService.ActualizarVenta(this.idventa, datos).subscribe({
      next: () => {
        alert('Datos del cliente actualizados correctamente');
        this.modoEdicion = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Ocurrió un error al actualizar los datos.');
      }
    });
  }

  regresar(): void {
    this.router.navigate(['/pizzeria/ventas']);
  }
}