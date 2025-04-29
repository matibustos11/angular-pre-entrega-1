import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alumno } from './models';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  isEditingOrder: number | null = null;

  alumnoForm: FormGroup

  alumnos: Alumno[] = [
    {orden: 1, nombre: 'Matias Bustos', mail: 'mail1@mail.com'},
    {orden: 2, nombre: 'Martin Garabal', mail: 'mail2@mail.com'},
    {orden: 3, nombre: 'Ash Ketchum', mail: 'mail3@mail.com'},
    {orden: 4, nombre: 'Juan Suerte', mail: 'mail4@mail.com'},
    {orden: 5, nombre: 'Gary Beil', mail: 'mail5@mail.com'},
  ];

  constructor(private fb: FormBuilder) {
    this.alumnoForm = this.fb.group( {
      nombre: [''],
      mail: [''],
    });
  }

  onSubmit() {

    if (this.isEditingOrder) {

      this.alumnos = this.alumnos.map ((alumno) => alumno.orden === this.isEditingOrder ? { ...alumno, ...this.alumnoForm.value } : alumno );

    } else {

      const newAlumno = this.alumnoForm.value;
      newAlumno.orden = this.alumnos.length + 1;
      this.alumnos = [...this.alumnos, newAlumno];
  }
    this.alumnoForm.reset();
    this.isEditingOrder = null;

  }

  onDeleteAlumno(orden: number) {
    if (confirm ('¿Quiere eliminar este alumno del listado?') ) {
      this.alumnos = this.alumnos.filter ( (alumno) => alumno.orden !== orden);
    }
  }

  onEditAlumno(alumno: Alumno) {
    this.isEditingOrder = alumno.orden;
    this.alumnoForm.patchValue(alumno);
  }

}
