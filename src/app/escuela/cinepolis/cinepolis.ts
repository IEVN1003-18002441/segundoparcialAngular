
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticket } from '../ticket';
import { Comprador } from '../comprador';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css',
})
export class Cinepolis implements OnInit {

  formulario!: FormGroup;
  nuevoTicket!: Ticket;

  ventas: Comprador[] = [];

  compraExitosa = false;
  mensajeError = '';

  nombreVal: string = '';
  numCompradoresVal: number = 0;
  cantidadBolVal: number = 0;
  tarjetaCanVal: boolean = false;

  subtotal: number = 0;
  descuentoAplicado: number = 0;
  total: number = 0;

  fecha: string = new Date().toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      numCompradores: new FormControl(''),
      tarjetaCan: new FormControl(false),
      cantidadBol: new FormControl(''),
      valorTotal: new FormControl(''),
    });

    this.cargarVentas();
  }

  procesarCompra(): void {
    this.compraExitosa = false;
    this.mensajeError = '';

    this.nombreVal = this.formulario.value.nombre;
    this.numCompradoresVal = Number(this.formulario.value.numCompradores);
    this.cantidadBolVal = Number(this.formulario.value.cantidadBol);
    this.tarjetaCanVal = this.formulario.value.tarjetaCan;

    if (
      !this.nombreVal ||
      this.numCompradoresVal <= 0 ||
      this.cantidadBolVal <= 0
    ) {
      this.mensajeError = 'Completa todos los campos correctamente';
      return;
    }

    if (this.cantidadBolVal > this.numCompradoresVal * 7) {
      this.mensajeError = 'Solo se permiten 7 boletos por comprador';
      return;
    }

    this.subtotal = this.cantidadBolVal * 12;

    let totalTemporal = this.subtotal;

    if (this.cantidadBolVal > 5) {
      totalTemporal = totalTemporal * 0.85;
    } else if (this.cantidadBolVal >= 3) {
      totalTemporal = totalTemporal * 0.90;
    }

    if (this.tarjetaCanVal) {
      totalTemporal = totalTemporal * 0.90;
    }

    this.total = totalTemporal;
    this.descuentoAplicado = this.subtotal - this.total;

    this.nuevoTicket = {
      nombre: this.nombreVal,
      numCompradores: this.numCompradoresVal,
      tarjetaCan: this.tarjetaCanVal,
      cantidadBol: this.cantidadBolVal,
      valorTotal: this.total
    };

    this.compraExitosa = true;
  }

  agregarVentas(): void {
    if (!this.compraExitosa) {
      this.mensajeError = 'Primero debes procesar la compra';
      return;
    }

    const nuevaVenta: Comprador = {
      nombreCliente: this.nombreVal,
      compradores: this.numCompradoresVal,
      boletasCompradas: this.cantidadBolVal,
      tarjetaCineco: this.tarjetaCanVal ? 'Sí' : 'No',
      totalPagar: this.total,
      descuento: this.descuentoAplicado,
      mensajeError: ''
    };

    this.ventas.push(nuevaVenta);

    localStorage.setItem('ventas', JSON.stringify(this.ventas));

    this.compraExitosa = false;
    this.mensajeError = '';

    alert('Compra registrada con éxito');
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventas');

    if (datos) {
      this.ventas = JSON.parse(datos);
    }
  }

  imprimirTicket(): void {
    window.print();
  }
}
