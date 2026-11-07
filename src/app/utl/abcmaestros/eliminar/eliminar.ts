import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { MaestrosUTL } from '../maestrosUTL';
import { ProyectoapiService } from '../maestrosapi.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink], 
  selector: 'app-eliminar',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {

  formulario!: FormGroup;
  idmaestro: string = '';
  
  regMaestro: MaestrosUTL = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public apiService: ProyectoapiService, 
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      idmaestro: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    this.idmaestro = this.route.snapshot.paramMap.get('idmaestro') || '';

    this.apiService.getMaestro(this.idmaestro).subscribe({
      next: (response) => {
        this.regMaestro = response.maestro || response;
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
      }
    });
  }

  eliminarMaestro(): void {
    this.apiService.EliminaMaestro(parseInt(this.idmaestro)).subscribe({
      next: (response) => {
        alert('Maestro eliminado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Ocurrió un error al eliminar el maestro');
      }
    });
  }
}