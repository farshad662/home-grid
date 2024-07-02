import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import {DataService} from "./services/data.service";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
  providers: [
    DataService
  ]
})
export class CustomerModule { }
