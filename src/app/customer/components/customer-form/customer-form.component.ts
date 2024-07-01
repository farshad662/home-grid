import {Component, Inject} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  customerForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<CustomerFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.customerForm = fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationalCode: ['', Validators.required],
      mobile: ['', Validators.required],
      company: ['', Validators.required]
    });
    if (this.data?.customer) {
      this.customerForm.patchValue(this.data?.customer);
    }
  }

  customerFormSubmit() {
    this.closeDialog(this.customerForm.value);
  }

  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }

}
