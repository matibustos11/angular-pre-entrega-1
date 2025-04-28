import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { AlumnosTableComponent } from './components/alumnos-table/alumnos-table.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosTableComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    MatTableModule
  ],
  exports: [AlumnosComponent]
})
export class AlumnosModule { }
