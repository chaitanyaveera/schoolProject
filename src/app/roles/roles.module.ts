import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { SharedmoduleModule } from '../services/sharedmodule/sharedmodule.module';


@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedmoduleModule
  ]
})
export class RolesModule { }
