import { Component } from '@angular/core';
import { Alumno } from '../../models';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Alumno[] = [
  {orden: 1, nombre: 'Matias Bustos', mail: 'mail1@mail.com'},
  {orden: 2, nombre: 'Martin Garabal', mail: 'mail2@mail.com'},
  {orden: 3, nombre: 'Ash Ketchum', mail: 'mail3@mail.com'},
  {orden: 4, nombre: 'Juan Suerte', mail: 'mail4@mail.com'},
  {orden: 5, nombre: 'Gary Beil', mail: 'mail5@mail.com'},
];

@Component({
  selector: 'app-alumnos-table',
  standalone: false,
  templateUrl: './alumnos-table.component.html',
  styleUrl: './alumnos-table.component.scss'
})
export class AlumnosTableComponent {
  displayedColumns: string[] = ['orden', 'nombre', 'mail'];
  dataSource = ELEMENT_DATA;
}
