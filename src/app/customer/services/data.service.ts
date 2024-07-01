import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Customer} from "../models/customer";
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class DataService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  addCustomer(customer: Customer) {
    if (isPlatformBrowser(this.platformId)) {
      let customers = JSON.parse(localStorage.getItem('customerList'));
      customer.id = Math.random();
      if (customers?.length) {
        customers.push(customer);
        localStorage.setItem('customerList', JSON.stringify(customers));
      } else {
        localStorage.setItem('customerList', JSON.stringify([customer]));
      }
    }
  }

  getCustomers() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('customerList'));
    }
  }

  deleteCustomer(id: number) {
    localStorage.setItem('customerList', JSON.stringify(this.getCustomers().filter(c => c.id !== id)));
  }

  deleteCustomerList(ids: number[]) {
    localStorage.setItem('customerList', JSON.stringify(this.getCustomers().filter(c => !ids.includes(c.id))));
  }

  editCustomer(customer: Customer) {
    const list = this.getCustomers();
    let index = list.indexOf(list.find(c => c.id === customer.id));
    if (index > -1) {
      list[index] = customer;
      localStorage.setItem('customerList', JSON.stringify(list));
    }
  }
}
