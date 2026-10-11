import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticket } from '../ticket';

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

  compraExitosa = false;
  mensajeError = '';

  nombreVal: string = '';
  numCompradoresVal: number = 0;
  cantidadBolVal: number = 0;
  tarjetaCanVal: boolean = false;
  
  subtotal: number = 0;
  descuentoAplicado: number = 0;
  total: number = 0;

  // Fecha tal como la tenías originalmente
  fecha: string = new Date().toLocaleString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      numCompradores: new FormControl(''),
      tarjetaCan: new FormControl(false),
      cantidadBol: new FormControl(''),
      valorTotal: new FormControl(''),
    });
  }

  procesarCompra(): void {
    this.compraExitosa = false;
    this.mensajeError = '';

    this.nombreVal = this.formulario.value.nombre;
    this.numCompradoresVal = Number(this.formulario.value.numCompradores);
    this.cantidadBolVal = Number(this.formulario.value.cantidadBol);
    this.tarjetaCanVal = this.formulario.value.tarjetaCan;
    this.fecha; 

    if (this.cantidadBolVal > this.numCompradoresVal * 7) {
      this.mensajeError = 'solo 7boletos por compradoor';
    } else {
      // ssubtotal 
      this.subtotal = this.cantidadBolVal * 12;

      let totalTemporal = this.subtotal;

      // descuentos 
      if (this.cantidadBolVal > 5) {
        totalTemporal = totalTemporal * 0.85; 
      } else if (this.cantidadBolVal >= 3 && this.cantidadBolVal <= 5) {
        totalTemporal = totalTemporal * 0.90; 
      }

      // desc 10%cineco
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
  }

  imprimirTicket(): void {
    window.print();
  }
}