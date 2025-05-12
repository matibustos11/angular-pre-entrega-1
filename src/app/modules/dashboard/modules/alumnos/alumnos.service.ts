import { Injectable } from '@angular/core';
import { Alumno } from './models';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Alumno[] = [
    {orden: 1, nombre: 'Matias Bustos', mail: 'mail1@mail.com'},
    {orden: 2, nombre: 'Martin Garabal', mail: 'mail2@mail.com'},
    {orden: 3, nombre: 'Ash Ketchum', mail: 'mail3@mail.com'},
    {orden: 4, nombre: 'Juan Suerte', mail: 'mail4@mail.com'},
    {orden: 5, nombre: 'Gary Beil', mail: 'mail5@mail.com'},
  ];

  constructor() { }

  getAlumnos(): Alumno[] {
    return this.alumnos;
  }

  addAlumno(alumno: Omit<Alumno, 'orden'>): Alumno {
    const newAlumno: Alumno = {
      ...alumno,
      orden: this.alumnos.length + 1
    };
    this.alumnos = [...this.alumnos, newAlumno];
    return newAlumno;
  }

  updateAlumno(orden: number, alumnoData: Partial<Alumno>): Alumno | null {
    const index = this.alumnos.findIndex(a => a.orden === orden);
    if (index === -1) return null;

    const updatedAlumno = {
      ...this.alumnos[index],
      ...alumnoData
    };

    this.alumnos = [
      ...this.alumnos.slice(0, index),
      updatedAlumno,
      ...this.alumnos.slice(index + 1)
    ];

    return updatedAlumno;
  }

  deleteAlumno(orden: number): boolean {
    const initialLength = this.alumnos.length;
    this.alumnos = this.alumnos.filter(a => a.orden !== orden);
    return this.alumnos.length !== initialLength;
  }

  getAlumnoByOrden(orden: number): Alumno | undefined {
    return this.alumnos.find(a => a.orden === orden);
  }
}
