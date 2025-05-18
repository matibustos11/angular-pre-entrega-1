import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Partimos de base /dashboard
const routes: Routes = [
  {
    path: 'alumnos',
    loadChildren: () => import ('./modules/alumnos/alumnos.module').then(m => m.AlumnosModule),
  },
  {
    path: 'clases',
    loadChildren: () => import ('./modules/clases/clases.module').then(m => m.ClasesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
