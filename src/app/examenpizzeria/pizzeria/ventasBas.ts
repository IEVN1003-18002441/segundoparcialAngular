export interface ventasBas {
  idventa?: number; // Opcional al crear, obligatorio al leer
  nombre: string;
  direccion: string;
  telefono: string;
  fecha_pedido?: string; // MySQL lo genera automáticamente
  total_pedido: number;
}

// Interfaces adicionales para manejar el detalle de las pizzas en tu formulario temporal:
export interface PizzaDetalle {
  tamano: string;
  ingredientes: string;
  num_pizzas: number;
  precio: number;
  subtotal: number;
}

export interface PedidoPizzeria {
  nombre: string;
  direccion: string;
  telefono: string;
  total_pedido: number;
  pizzas: PizzaDetalle[];
}