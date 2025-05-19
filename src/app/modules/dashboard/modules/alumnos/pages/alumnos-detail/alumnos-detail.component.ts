import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { Observable } from 'rxjs';
import { Alumno } from '../../models';

@Component({
  selector: 'app-alumnos-detail',
  standalone: false,
  templateUrl: './alumnos-detail.component.html',
  styleUrl: './alumnos-detail.component.scss'
})
export class AlumnosDetailComponent {

  alumno$: Observable<Alumno | null>;

  constructor(private activatedRoute: ActivatedRoute, private alumnosService: AlumnosService) {
    const ordenAlumno = this.activatedRoute.snapshot.params['orden'];

    this.alumno$ = this.alumnosService.getAlumnoByOrden(ordenAlumno)
    console.log('Orden de alumno', ordenAlumno);


  }
}
