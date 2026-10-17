import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alumno } from '../alumno';
 
@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-lista-escuela',
  styleUrl: './lista-escuela.css',
  templateUrl: './lista-escuela.html',
})
export class ListaEscuela implements OnInit {
  formulario!: FormGroup;
 
  alumnos: Alumno[] = [];
  indiceEdicion: number = -1;
 
  nuevoAlumno: Alumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  };
 
  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });

    // Cargar los alumnos guardados al iniciar el componente
    this.cargarAlumnos();
  }
 
  agregarAlumnos(): void {
    if (
      this.nuevoAlumno.matricula.trim() === '' ||
      this.nuevoAlumno.nombre.trim() === '' ||
      this.nuevoAlumno.correo.trim() === '' ||
      this.nuevoAlumno.materia.trim() === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
 
    if (this.indiceEdicion > -1) {
      // Actualizar alumno existente
      this.alumnos[this.indiceEdicion] = { ...this.nuevoAlumno };
      this.indiceEdicion = -1;
    } else {
      // Agregar nuevo alumno
      this.alumnos.push({ ...this.nuevoAlumno });
    }
 
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
    this.limpiarCampos();
  }
 
  muestraAlumno(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;
    this.agregarAlumnos();
  }
 
  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');
    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
    
    if (this.indiceEdicion === index) {
      this.limpiarCampos();
    }
  }

  limpiarCampos(): void {
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };
    
    this.formulario.reset({
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    });

    this.indiceEdicion = -1;
  }

  editarAlumno(index: number): void {
    const alumno = this.alumnos[index];
    
    // Copiamos los datos al objeto temporal
    this.nuevoAlumno = { ...alumno };

    // Sincronizamos con el formulario reactivo
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    });

    this.indiceEdicion = index;
  }
}