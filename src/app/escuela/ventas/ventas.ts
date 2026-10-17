import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Comprador } from '../comprador';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-ventas',
  styleUrl: './ventas.css',
  templateUrl: './ventas.html',
})
export class Ventas implements OnInit {
  formulario!: FormGroup;
  totalGeneral: number = 0;
  ventas: Comprador[] = [];
  indiceEdicion: number = -1;

  nuevaVenta: Comprador = {
    nombreCliente: '',
    totalPagar: 0,
    boletasCompradas: 0,
    mensajeError: '',
    tarjetaCineco: 'No',
    descuento: 0,
    compradores: 1
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombreCliente: new FormControl(''),
      compradores: new FormControl(1),
      boletasCompradas: new FormControl(0),
      tarjetaCineco: new FormControl('No'),
      descuento: new FormControl(0),
      totalPagar: new FormControl(0),
      mensajeError: new FormControl('')
    });

    // Cargar las ventas guardadas al iniciar el componente
    this.obtenerVentas();
  }

  muestraVenta(): void {
    const formVal = this.formulario.value;

    this.nuevaVenta = {
      nombreCliente: formVal.nombreCliente ?? '',
      compradores: Number(formVal.compradores) || 0,
      boletasCompradas: Number(formVal.boletasCompradas) || 0,
      tarjetaCineco: formVal.tarjetaCineco ?? 'No',
      descuento: Number(formVal.descuento) || 0,
      totalPagar: Number(formVal.totalPagar) || 0,
      mensajeError: formVal.mensajeError ?? ''
    };

    this.agregarVentas();
  }

  agregarVentas(): void {
    if (!this.nuevaVenta.nombreCliente.trim()) {
      alert('El nombre del cliente es obligatorio');
      return;
    }

    if (this.indiceEdicion > -1) {
      // Actualizar venta existente
      this.ventas[this.indiceEdicion] = { ...this.nuevaVenta };
      this.indiceEdicion = -1;
    } else {
      // Agregar nueva venta
      this.ventas.push({ ...this.nuevaVenta });
    }

    localStorage.setItem('ventas', JSON.stringify(this.ventas));
    this.calcularTotalGeneral();
    this.limpiarCampos();
  }

  obtenerVentas(): void {
    const datos = localStorage.getItem('ventas');
    if (datos) {
      this.ventas = JSON.parse(datos);
      this.calcularTotalGeneral();
    }
  }

  eliminarVenta(index: number): void {
    this.ventas.splice(index, 1);
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
    this.calcularTotalGeneral();

    if (this.indiceEdicion === index) {
      this.limpiarCampos();
    }
  }

  limpiarCampos(): void {
    this.nuevaVenta = {
      nombreCliente: '',
      totalPagar: 0,
      boletasCompradas: 0,
      mensajeError: '',
      tarjetaCineco: 'No',
      descuento: 0,
      compradores: 1
    };

    this.formulario.reset({
      nombreCliente: '',
      compradores: 1,
      boletasCompradas: 0,
      tarjetaCineco: 'No',
      descuento: 0,
      totalPagar: 0,
      mensajeError: ''
    });

    this.indiceEdicion = -1;
  }

  editarVenta(index: number): void {
    const venta = this.ventas[index];

    // Copiamos los datos al objeto temporal
    this.nuevaVenta = { ...venta };

    // Sincronizamos con el formulario reactivo
    this.formulario.patchValue({
      nombreCliente: venta.nombreCliente,
      compradores: venta.compradores,
      boletasCompradas: venta.boletasCompradas,
      tarjetaCineco: venta.tarjetaCineco,
      descuento: venta.descuento,
      totalPagar: venta.totalPagar,
      mensajeError: venta.mensajeError
    });

    this.indiceEdicion = index;
  }

  calcularTotalGeneral(): void {
    this.totalGeneral = this.ventas.reduce((acumulado, venta) => acumulado + Number(venta.totalPagar || 0), 0);
  }
}