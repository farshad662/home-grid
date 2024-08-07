import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material.module";
import { LayoutComponent } from './components/layout/layout.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import {RouterModule} from "@angular/router";
import { JalaliDatePipe } from './pipes/jalali-date.pipe';



@NgModule({
  declarations: [
    LayoutComponent,
    SideBarComponent,
    JalaliDatePipe
  ],
  exports: [
    JalaliDatePipe,
    MaterialModule
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }
