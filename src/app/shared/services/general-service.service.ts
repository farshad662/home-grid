import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  clickedGender: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  refreshClocked = new Subject();

  constructor() { }
}
