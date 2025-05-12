import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alumno } from './models';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {
  isEditingOrder: number | null = null;
  alumnoForm: FormGroup;
  alumnos: Alumno[] = [];

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService
  ) {
    this.alumnoForm = this.fb.group({
      nombre: [''],
      mail: ['']
    });
    this.loadAlumnos();
  }

  private loadAlumnos(): void {
    this.alumnos = this.alumnosService.getAlumnos();
  }

  onSubmit(): void {
    if (this.isEditingOrder) {
      const updated = this.alumnosService.updateAlumno(
        this.isEditingOrder,
        this.alumnoForm.value
      );
      if (updated) {
        this.loadAlumnos();
      }
    } else {
      this.alumnosService.addAlumno(this.alumnoForm.value);
      this.loadAlumnos();
    }
    this.alumnoForm.reset();
    this.isEditingOrder = null;
  }

  onDeleteAlumno(orden: number): void {
    if (confirm('¿Quiere eliminar este alumno del listado?')) {
      const deleted = this.alumnosService.deleteAlumno(orden);
      if (deleted) {
        this.loadAlumnos();
      }
    }
  }

  onEditAlumno(orden: number): void {
    const alumno = this.alumnosService.getAlumnoByOrden(orden);
    if (alumno) {
      this.isEditingOrder = orden;
      this.alumnoForm.patchValue({
        nombre: alumno.nombre,
        mail: alumno.mail
      });
    }
  }
}
