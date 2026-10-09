import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Ticket } from '../ticket';
@Component({
  imports: [ FormsModule,ReactiveFormsModule],
  selector: 'app-cinepolis',
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis {
formulario!: FormGroup

nuevoTicket!: Ticket;

 ngOnInit():void{
  this.formulario = new FormGroup({
  nombre: new FormControl(''),
  numCompradores: new FormControl(''),
  taerjetaCan: new FormControl(''),
  cantidadBol: new FormControl(''),
    valorTotal: new FormControl(''),
})
 }

 procesarCompra():void{

      this.nuevoTicket.nombre =  this.formulario.value.nombre
      this.nuevoTicket.numCompradores = this.formulario.value.numCompradores
      this.nuevoTicket.tarjetaCan = this.formulario.value.taerjetaCan
      this.nuevoTicket.cantidadBol = this.formulario.value.cantidadBol
      this.nuevoTicket.valorTotal = this.formulario.value.valorTotal

 }

}
