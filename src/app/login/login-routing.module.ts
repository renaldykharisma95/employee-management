import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginCompComponent } from '../login/login-comp.component';


const routes: Routes = [
  {
    path: '',
    component: LoginCompComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
