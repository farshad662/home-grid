import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "./models/customer";
import {Paging} from "./models/paging";
import {MatDialog} from "@angular/material/dialog";
import {CustomerFormComponent, isValidNationalCode} from "./components/customer-form/customer-form.component";
import {DataService} from "./services/data.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GeneralServiceService} from "../shared/services/general-service.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements AfterViewInit{
  dataSource: MatTableDataSource<Customer>;
  filterForm: UntypedFormGroup;
  numOfRows: number;
  loading: boolean;
  selectedItem: number[] = [];
  orderPaging: Paging = new Paging(1, 10);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  companyList = this.generalService.companyList;
  displayedColumns = ['id', 'firstName', 'lastName', 'gender', 'birthDate', 'nationalCode', 'mobile', 'company', 'opr'];
  private customersList = this.dataService.getCustomers();

  constructor(private dialog: MatDialog,
              private generalService: GeneralServiceService,
              private fb: UntypedFormBuilder,
              private dataService: DataService) {
    generalService.refreshClocked.subscribe(res => {
      this.getCustomersList();
    });
    this.getCustomersList();
    this.filterForm = fb.group({
      firstName: [null],
      lastName: [null],
      gender: [null],
      birthDate: [null],
      nationalCode: [null],
      mobile: [null],
      company: [null]
    });
    this.filterForm.valueChanges.subscribe(res => {
      let filteredList = this.dataService.getCustomers();
      Object.keys(res).forEach(key => {
        if (res[key] || res[key] !== null) {
          if (key === 'birthDate') {
            filteredList = filteredList.filter(c => c[key].includes(res[key].toISOString()));
          } else {
            filteredList = filteredList.filter(c => c[key].includes(res[key]));
          }
        }
      });
      this.dataSource = new MatTableDataSource(filteredList);
    });
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
    },1000);
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

  selectItem(checked, id) {
    if (checked) {
      this.selectedItem.push(id);
    } else {
      const index = this.selectedItem.indexOf(id);
      if (index > -1) {
        this.selectedItem.splice(index, 1)
      }
    }
  }

  deleteSelected() {
    this.dataService.deleteCustomerList(this.selectedItem)
    this.selectedItem = [];
    this.getCustomersList();
  }

  selectAll(checked: boolean) {
    if (checked) {
      let list = this.dataService.getCustomers();
      list.forEach(c => {
        this.selectedItem.push(c.id);
      });
    } else {
      this.selectedItem = [];
    }
  }
}
