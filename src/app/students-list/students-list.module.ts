import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsListRoutingModule } from './students-list-routing.module';
import { StudentsListComponent } from './students-list.component';
import { SharedmoduleModule } from '../services/sharedmodule/sharedmodule.module';


@NgModule({
  declarations: [StudentsListComponent],
  imports: [
    CommonModule,
    StudentsListRoutingModule,
    SharedmoduleModule
  ]
})
export class StudentsListModule { }
