import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './shared-layout/layout/base-layout/base-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/login/login.module').then(m=>m.LoginModule)
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'employee-list',
        loadChildren: () => import('../app/employee/employee.module').then(m=>m.EmployeeModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./shared-layout/layout/layout.module').then(m => m.LayoutModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
