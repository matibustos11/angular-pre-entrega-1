import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../models';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-alumnos-table',
  standalone: false,
  templateUrl: './alumnos-table.component.html',
  styleUrl: './alumnos-table.component.scss'
})
export class AlumnosTableComponent {
  displayedColumns: string[] = ['orden', 'nombre', 'mail', 'actions'];

  @Input()
  dataSource: Alumno[] = [];

  @Output()
  deleteAlumno = new EventEmitter<number>

  @Output()
  editAlumno = new EventEmitter<Alumno>
}
