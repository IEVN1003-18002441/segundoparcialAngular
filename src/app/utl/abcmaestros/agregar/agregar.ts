import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// Aseguramos que use tu interfaz de Maestros
import { MaestrosUTL } from '../maestrosUTL'; 
// Importamos el servicio correcto de Maestros
import { ProyectoapiService } from '../maestrosapi.service'; 

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-agregar',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  
  formGroup!: FormGroup;

  regMaestro: MaestrosUTL = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private fb: FormBuilder,
    public apiService: ProyectoapiService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      idmaestro: [''], 
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('El formulario contiene datos inválidos');
      return;
    }

    const datos: MaestrosUTL = this.formGroup.getRawValue();

    console.log('Datos que se enviarán:', datos);

    this.apiService.agregarNuevoMaestro(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de la API:', respuesta);
        alert('Maestro registrado correctamente');

        this.formGroup.reset();

        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al registrar maestro:', error);

        const mensaje =
          error.error?.mensaje ||
          error.error?.error ||
          error.message ||
          'Ocurrió un error al registrar el maestro';

        alert(mensaje);
      }
    });
  }
}