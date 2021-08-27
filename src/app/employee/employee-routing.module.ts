import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeActionsComponent } from './employee-actions/employee-actions.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'employee-actions',
    pathMatch: 'full',
    component: EmployeeActionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
