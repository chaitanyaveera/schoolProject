import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedmoduleModule } from '../services/sharedmodule/sharedmodule.module';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedmoduleModule,
    MatGridListModule
  ]
})
export class ProfileModule { }
