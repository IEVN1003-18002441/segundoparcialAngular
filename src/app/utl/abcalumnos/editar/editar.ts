import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { AlumnosUTL } from '../alumnosUTL';
import { ProyectoapiService } from '../alumnosapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink], 
  selector: 'app-editar',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  
  
  formulario!: FormGroup;
  matricula: string = '';

  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';

    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next: (response) => {
        this.formulario.patchValue(response.alumno);
        // }
      },
      error: (error) => {
        console.error('Error al consultar el alumno:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const alumno: AlumnosUTL = this.formulario.getRawValue();

    this.alumnosUtl.modificarAlumno(parseInt(this.matricula), alumno).subscribe({
      next: (response) => {
        if (response) {
          alert('Alumno actualizado correctamente');
          // Regresar a la tabla
          this.router.navigate(['/utl/alumnos']);
        } else {
          alert('No se pudo actualizar el alumno');
        }
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar el alumno');
      }
    });
  }
}