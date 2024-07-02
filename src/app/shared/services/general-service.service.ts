import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  clickedGender: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  refreshClocked = new Subject();
  companyList = ['مفید', 'مضر', 'بی ضرر', 'ضرر دار', 'خطر دار'];

  constructor() { }
}
