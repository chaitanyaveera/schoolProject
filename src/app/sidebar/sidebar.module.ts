import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { SharedmoduleModule } from '../services/sharedmodule/sharedmodule.module';


@NgModule({
  declarations: [SidebarComponent],
  imports: [
    SidebarRoutingModule,
    SharedmoduleModule
  ]
})
export class SidebarModule { }
