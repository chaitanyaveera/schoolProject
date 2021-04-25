import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { SharedmoduleModule } from '../services/sharedmodule/sharedmodule.module';


@NgModule({
  declarations: [TeachersComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedmoduleModule
  ]
})
export class TeachersModule { }
