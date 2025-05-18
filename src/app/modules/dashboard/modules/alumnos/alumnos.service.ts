import { Injectable } from '@angular/core';
import { Alumno } from './models';
import { Observable, of, delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Alumno[] = [
    { orden: 1, nombre: 'Matias Bustos', mail: 'mail1@mail.com' },
    { orden: 2, nombre: 'Martin Garabal', mail: 'mail2@mail.com' },
    { orden: 3, nombre: 'Ash Ketchum', mail: 'mail3@mail.com' },
    { orden: 4, nombre: 'Juan Suerte', mail: 'mail4@mail.com' },
    { orden: 5, nombre: 'Gary Beil', mail: 'mail5@mail.com' },
  ];

  constructor() { }

  // Devuelve un Observable con la lista de alumnos
  getAlumnos$(): Observable<Alumno[]> {
    return of([...this.alumnos]).pipe(
      delay(1000),
      tap(() => console.log('Datos mockeados cargados'))
    );
  }

  // Añade un alumno y devuelve un Observable con el nuevo alumno
  addAlumno$(alumno: Omit<Alumno, 'orden'>): Observable<Alumno> {
    const newAlumno: Alumno = {
      ...alumno,
      orden: this.alumnos.length + 1
    };
    this.alumnos = [...this.alumnos, newAlumno];
    return of(newAlumno).pipe(delay(500));
  }

  // Actualiza un alumno y devuelve un Observable con el alumno actualizado
  updateAlumno$(orden: number, alumnoData: Partial<Alumno>): Observable<Alumno | null> {
    const index = this.alumnos.findIndex(a => a.orden === orden);
    if (index === -1) return of(null);

    const updatedAlumno = { ...this.alumnos[index], ...alumnoData };
    this.alumnos = [
      ...this.alumnos.slice(0, index),
      updatedAlumno,
      ...this.alumnos.slice(index + 1)
    ];
    return of(updatedAlumno).pipe(delay(500));
  }

  // Elimina un alumno y devuelve un Observable booleano
  deleteAlumno$(orden: number): Observable<boolean> {
    const initialLength = this.alumnos.length;
    this.alumnos = this.alumnos.filter(a => a.orden !== orden);
    return of(this.alumnos.length !== initialLength).pipe(delay(500));
  }

  // Obtiene un alumno por orden
  getAlumnoByOrden$(orden: number): Observable<Alumno | undefined> {
    const alumno = this.alumnos.find(a => a.orden === orden);
    return of(alumno).pipe(delay(500));
  }
}
