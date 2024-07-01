import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "./models/customer";
import {Paging} from "./models/paging";
import {MatDialog} from "@angular/material/dialog";
import {CustomerFormComponent} from "./components/customer-form/customer-form.component";
import {DataService} from "./services/data.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GeneralServiceService} from "../shared/services/general-service.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements AfterViewInit{
  dataSource: MatTableDataSource<Customer>;
  numOfRows: number;
  loading: boolean;
  orderPaging: Paging = new Paging(1, 10);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['id', 'firstName', 'lastName', 'gender', 'birthDate', 'nationalCode', 'mobile', 'company', 'opr'];

  constructor(private dialog: MatDialog,
              private generalService: GeneralServiceService,
              private dataService: DataService) {
    generalService.refreshClocked.subscribe(res => {
      this.getCustomersList();
    });
    this.getCustomersList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getCustomersList() {
    this.loading = true;
    let list = this.dataService.getCustomers();
    this.numOfRows = list?.length;
    this.dataSource = new MatTableDataSource(list);
    setTimeout(() => {
      this.loading = false;
    },2000);
  }

  setPagination(e) {
    this.orderPaging.page = e.pageIndex + 1;
    this.orderPaging.pageSize = e.pageSize || 10;
  }

  openFormDialog(customer?): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      data: {customer},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (customer) {
          this.dataService.editCustomer(result);
        } else {
          this.dataService.addCustomer(result);
        }
        this.getCustomersList();
      }
    });
  }

  deleteRow(row) {
    this.dataService.deleteCustomer(row.id);
    this.getCustomersList();
  }

  changeParentColor(gender) {
    this.generalService.clickedGender.next(gender);
  }
}
