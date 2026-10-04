import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {

  nombre: string = '';
  apaterno: string = '';
  amaterno: string = '';
  dia: number | null = null;
  mes: number | null = null;
  ano: number | null = null;
  sexo: string = '';

  mostrarResultado: boolean = false;
  resultadoNombre: string = '';
  resultadoEdad: number = 0;
  resultadoSigno: string = '';
  resultadoImagen: string = ''; 

  zodiacoChino = [
    { signo: 'mono', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Mono-768x657-1.jpg' },
    { signo: 'gallo', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Gallo-768x657-1.jpg' },
    { signo: 'perro', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Perro-768x657-1.jpg' },
    { signo: 'cerdo', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cerdo-768x657-1.jpg' },
    { signo: 'rata', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Rata-768x657-1.jpg' },
    { signo: 'buey', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Buey-768x657-1.jpg' },
    { signo: 'tigre', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Tigre-768x657-1.jpg' },
    { signo: 'conejo', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Conejo-768x657-1.jpg' },
    { signo: 'dragón', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Dragon-768x657-1.jpg' },
    { signo: 'serpiente', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Serpiente-768x657-1.jpg' },
    { signo: 'caballo', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Caballo-768x657-1.jpg' },
    { signo: 'cabra', imagen: 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cabra-768x657-1.jpg' }
  ];

  procesarDatos(): void {
    if (!this.dia || !this.mes || !this.ano) {
      alert("Por favor ingresa tu fecha de nacimiento completa.");
      return;
    }

    const fechaActual = new Date();
    const anoActual = fechaActual.getFullYear();
    let edad = anoActual - this.ano;
    
    const mesActual = fechaActual.getMonth() + 1; 
    const diaActual = fechaActual.getDate();
    if (mesActual < this.mes || (mesActual === this.mes && diaActual < this.dia)) {
      edad--;
    }

    const indiceSigno = this.ano % 12;
    const animalSeleccionado = this.zodiacoChino[indiceSigno];

    this.resultadoNombre = `${this.nombre} ${this.apaterno} ${this.amaterno}`.trim() || 'Usuario';
    this.resultadoEdad = Math.max(0, edad); 
    this.resultadoSigno = animalSeleccionado.signo;
    this.resultadoImagen = animalSeleccionado.imagen; 

    this.mostrarResultado = true;
  }
}
