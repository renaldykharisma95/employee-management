import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    LayoutRoutingModule
  ],
  exports: [
    BaseLayoutComponent
  ]
})
export class LayoutModule { }
