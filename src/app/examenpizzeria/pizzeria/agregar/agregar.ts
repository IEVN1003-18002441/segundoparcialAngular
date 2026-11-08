import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PizzaDetalle, PedidoPizzeria } from '../ventasBas'; 
import { ProyectoapiService } from '../ventasapi.service'; 

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  
  formGroup!: FormGroup;
  listaPizzas: PizzaDetalle[] = [];

  constructor(
    private fb: FormBuilder,
    public pizzeriaService: ProyectoapiService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      tamano: ['Chica', Validators.required],
      ingredientes: ['', Validators.required],
      num_pizzas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  agregarPizzaTemporal(): void {
    if (this.formGroup.get('tamano')?.invalid || 
        this.formGroup.get('ingredientes')?.invalid || 
        this.formGroup.get('num_pizzas')?.invalid) {
      alert('Completa los datos de la pizza para poder agregarla');
      return;
    }

    const tamano = this.formGroup.value.tamano;
    const ingredientes = this.formGroup.value.ingredientes;
    const num_pizzas = Number(this.formGroup.value.num_pizzas);

    let precioUnitario = 0;
    if (tamano === 'Chica') precioUnitario = 40;
    else if (tamano === 'Mediana') precioUnitario = 80;
    else if (tamano === 'Grande') precioUnitario = 120;

    const subtotal = precioUnitario * num_pizzas;

    const nuevaPizza: PizzaDetalle = {
      tamano,
      ingredientes,
      num_pizzas,
      precio: precioUnitario,
      subtotal
    };

    this.listaPizzas.push(nuevaPizza);

    this.formGroup.patchValue({
      tamano: 'Chica',
      ingredientes: '',
      num_pizzas: 1
    });
  }

  quitarPizza(index: number): void {
    this.listaPizzas.splice(index, 1);
  }

  calcularTotalGeneral(): number {
    return this.listaPizzas.reduce((acc, pizza) => acc + pizza.subtotal, 0);
  }

  onSubmit(): void {
    if (this.listaPizzas.length === 0) {
      alert('Debes agregar al menos una pizza a la tabla de detalle antes de terminar.');
      return;
    }

    if (!this.formGroup.value.nombre || !this.formGroup.value.direccion || !this.formGroup.value.telefono) {
      alert('Por favor completa los datos del cliente (Nombre, Dirección y Teléfono).');
      return;
    }

    const totalGeneral = this.calcularTotalGeneral();

    const pedidoCompleto: PedidoPizzeria = {
      nombre: this.formGroup.value.nombre,
      direccion: this.formGroup.value.direccion,
      telefono: this.formGroup.value.telefono,
      total_pedido: totalGeneral,
      pizzas: this.listaPizzas
    };

    this.pizzeriaService.agregarNuevaVenta(pedidoCompleto).subscribe({
      next: (respuesta) => {
        alert(`¡Pedido registrado correctamente!\nImporte total a pagar: $${totalGeneral.toFixed(2)}`);
        this.formGroup.reset();
        this.listaPizzas = [];
        this.router.navigate(['/pizzeria/ventas']); 
      },
      error: (error) => {
        console.error('Error al registrar pedido:', error);
        const mensaje = error.error?.mensaje || 'Ocurrió un error al registrar el pedido';
        alert(mensaje);
      }
    });
  }
}