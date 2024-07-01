import {Component, ElementRef, inject, Inject, ViewChild} from '@angular/core';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";

export function isValidNationalCode (field) {
  let code = field.value;
  if (code) {
    if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return {invalidCode: true};
    let sum = 0,
      chars = code.split(''),
      lastDigit,
      remainder;
    for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);
    remainder = sum % 11;
    lastDigit = remainder < 2 ? remainder : 11 - remainder;
    return +chars[9] === lastDigit ? null : {invalidCode: true};
  }
  return null;
}

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  @ViewChild('companyInput') companyInput: ElementRef<HTMLInputElement>;
  customerForm: UntypedFormGroup;
  companyList = ['مفید', 'مضر', 'بی ضرر', 'ضرر دار', 'خطر دار'];
  selectedCompanyList = [];
  announcer = inject(LiveAnnouncer);
  filteredCompanies: Observable<string[]>;
  companyCtrl = new FormControl('');
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: UntypedFormBuilder,
              public dialogRef: MatDialogRef<CustomerFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.customerForm = fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      nationalCode: ['', [Validators.required, isValidNationalCode]],
      mobile: ['', [Validators.required, Validators.pattern(/^09[0|12|3][0-9]{8}$/)]],
      company: ['', Validators.required]
    });
    if (this.data?.customer) {
      this.customerForm.patchValue(this.data?.customer);
    }
    this.filteredCompanies = this.companyCtrl.valueChanges.pipe(
      startWith(null),
      map((company: string | null) => (company ? this._filter(company) : this.companyList.slice())),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companyList.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  customerFormSubmit() {
    this.closeDialog(this.customerForm.value);
  }

  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }

  remove(company: string): void {
    const index = this.companyList.indexOf(company);
    if (index >= 0) {
      this.companyList.splice(index, 1);
      this.announcer.announce(`Removed ${company}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.companyList.push(value);
    }
    event.chipInput!.clear();
    this.companyCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCompanyList.push(event.option.viewValue);
    this.companyInput.nativeElement.value = '';
    this.companyCtrl.setValue(null);
  }

}
