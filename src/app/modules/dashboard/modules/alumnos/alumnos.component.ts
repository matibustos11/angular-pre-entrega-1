import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Alumno } from './models';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  standalone: false,
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent implements OnInit {
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
  }

  ngOnInit(): void {
    this.loadAlumnos();
  }

  private loadAlumnos(): void {
    this.alumnosService.getAlumnos$().subscribe({
      next: (alumnos) => this.alumnos = alumnos,
      error: (err) => console.error('Error cargando alumnos:', err)
    });
  }

  onSubmit(): void {
    if (this.isEditingOrder) {
      this.alumnosService.updateAlumno$(
        this.isEditingOrder,
        this.alumnoForm.value
      ).subscribe({
        next: (updated) => {
          if (updated) this.loadAlumnos();
        }
      });
    } else {
      this.alumnosService.addAlumno$(this.alumnoForm.value).subscribe({
        next: () => this.loadAlumnos()
      });
    }
    this.alumnoForm.reset();
    this.isEditingOrder = null;
  }

  onDeleteAlumno(orden: number): void {
    if (confirm('¿Eliminar este alumno?')) {
      this.alumnosService.deleteAlumno$(orden).subscribe({
        next: (deleted) => {
          if (deleted) this.loadAlumnos();
        }
      });
    }
  }

  onEditAlumno(orden: number): void {
    this.alumnosService.getAlumnoByOrden$(orden).subscribe({
      next: (alumno) => {
        if (alumno) {
          this.isEditingOrder = orden;
          this.alumnoForm.patchValue(alumno);
        }
      }
    });
  }
}
