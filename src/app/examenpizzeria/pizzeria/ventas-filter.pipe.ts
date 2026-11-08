import { Pipe, PipeTransform } from '@angular/core';
import { ventasBas } from './ventasBas'; // Asegúrate de que el nombre coincida con tu archivo

@Pipe({
  name: 'ventasFilter',
  standalone: true,
})
export class VentasFilterPipe implements PipeTransform {
  transform(value: ventasBas[], args: string): ventasBas[] {
    let filter: string = args ? args.toLocaleLowerCase() : '';
    
    // Filtra las ventas comparando el nombre del cliente
    return filter ? value.filter((venta: ventasBas) =>
      venta.nombre.toLocaleLowerCase().indexOf(filter) !== -1
    ) : value;
  }
}