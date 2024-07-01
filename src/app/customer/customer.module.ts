import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import {MaterialModule} from "../shared/material.module";
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import {DataService} from "./services/data.service";


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CustomerRoutingModule
  ],
  providers: [
    DataService
  ]
})
export class CustomerModule { }
