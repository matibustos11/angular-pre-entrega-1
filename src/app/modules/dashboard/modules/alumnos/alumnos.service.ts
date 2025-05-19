import { Injectable } from '@angular/core';
import { Alumno } from './models';
import { Observable, of, delay, tap, map } from 'rxjs';

var alumnos: Alumno[] = [
    { orden: 1, nombre: 'Matias Bustos', mail: 'mail1@mail.com' },
    { orden: 2, nombre: 'Martin Garabal', mail: 'mail2@mail.com' },
    { orden: 3, nombre: 'Ash Ketchum', mail: 'mail3@mail.com' },
    { orden: 4, nombre: 'Juan Suerte', mail: 'mail4@mail.com' },
    { orden: 5, nombre: 'Gary Beil', mail: 'mail5@mail.com' },
  ];

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  constructor() { }

  getAlumnoByOrden (orden: number): Observable <Alumno | null> {
    return of([...alumnos]).pipe( map((alumno) => alumno.find((alumno) => alumno.orden == orden) || null)
    );
  }

  // Devuelve un Observable con la lista de alumnos
  getAlumnos$(): Observable<Alumno[]> {
    return of([...alumnos]).pipe(
      delay(1000),
      tap(() => console.log('Datos mockeados cargados'))
    );
  }

  // Añade un alumno y devuelve un Observable con el nuevo alumno
  addAlumno$(alumno: Omit<Alumno, 'orden'>): Observable<Alumno> {
    const newAlumno: Alumno = {
      ...alumno,
      orden: alumnos.length + 1
    };
    alumnos = [...alumnos, newAlumno];
    return of(newAlumno).pipe(delay(500));
  }

  // Actualiza un alumno y devuelve un Observable con el alumno actualizado
  updateAlumno$(orden: number, alumnoData: Partial<Alumno>): Observable<Alumno | null> {
    const index = alumnos.findIndex(a => a.orden === orden);
    if (index === -1) return of(null);

    const updatedAlumno = { ...alumnos[index], ...alumnoData };
    alumnos = [
      ...alumnos.slice(0, index),
      updatedAlumno,
      ...alumnos.slice(index + 1)
    ];
    return of(updatedAlumno).pipe(delay(500));
  }

  // Elimina un alumno y devuelve un Observable booleano
  deleteAlumno$(orden: number): Observable<boolean> {
    const initialLength = alumnos.length;
    alumnos = alumnos.filter(a => a.orden !== orden);
    return of(alumnos.length !== initialLength).pipe(delay(500));
  }

  // Obtiene un alumno por orden
  getAlumnoByOrden$(orden: number): Observable<Alumno | undefined> {
    const alumno = alumnos.find(a => a.orden === orden);
    return of(alumno).pipe(delay(500));
  }
}
