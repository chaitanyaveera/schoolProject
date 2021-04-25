import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsListRoutingModule } from './students-list-routing.module';
import { StudentsListComponent } from './students-list.component';
import { SharedmoduleModule } from '../services/sharedmodule/sharedmodule.module';
import { NumberdirectivesDirective } from '../services/numberdirectives.directive';


@NgModule({
  declarations: [StudentsListComponent  , NumberdirectivesDirective],
  imports: [
    CommonModule,
    StudentsListRoutingModule,
    SharedmoduleModule
  ]
})
export class StudentsListModule { }
