import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ventasBas } from '../ventasBas'; 
import { ProyectoapiService } from '../ventasapi.service'; 

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {

  formulario!: FormGroup;
  idventa: string = '';
  
  regVenta: ventasBas = {
    idventa: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    fecha_pedido: '',
    total_pedido: 0
  };

  constructor(
    private route: ActivatedRoute,
    public pizzeriaService: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: [{value: '', disabled: true}],
      direccion: [{value: '', disabled: true}],
      telefono: [{value: '', disabled: true}],
      total_pedido: [{value: '', disabled: true}]
    });

    // Capturamos el idventa o matricula (según cómo esté en tu app.routes.ts)
    this.idventa = this.route.snapshot.paramMap.get('idventa') || this.route.snapshot.paramMap.get('matricula') || '';

    if (this.idventa) {
      this.pizzeriaService.getVentas().subscribe({
        next: (response: any) => {
          const ventas: ventasBas[] = response.ventas || [];
          const encontrada = ventas.find((v: ventasBas) => v.idventa === Number(this.idventa));
          if (encontrada) {
            this.regVenta = encontrada;
            this.formulario.patchValue({
              nombre: this.regVenta.nombre,
              direccion: this.regVenta.direccion,
              telefono: this.regVenta.telefono,
              total_pedido: `$${this.regVenta.total_pedido.toFixed(2)}`
            });
          }
        },
        error: (error: any) => {
          console.error('Error al consultar la venta:', error);
        }
      });
    }
  }

  eliminarVenta(): void {
    if (!this.idventa) return;

    this.pizzeriaService.EliminaVenta(Number(this.idventa)).subscribe({
      next: (response) => {
        alert('Venta y detalle eliminados correctamente');
        this.router.navigate(['/pizzeria/ventas']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al eliminar el pedido');
      }
    });
  }
}