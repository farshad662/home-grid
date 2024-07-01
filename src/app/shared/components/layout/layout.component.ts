import { Component } from '@angular/core';
import {GeneralServiceService} from "../../services/general-service.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  menuItems = new Array(1);
  selectedTabIndex: number;
  selectedGenderColor: string;

  constructor(private generalService: GeneralServiceService) {
    generalService.clickedGender.subscribe(gender => {
      switch (gender) {
        case 'مرد': this.selectedGenderColor = 'green'; break
        case 'زن': this.selectedGenderColor = 'red'; break
      }
    });
  }

  focusOnTab(event: number) {
    if (this.menuItems.length < event) {
      for (let i = this.menuItems.length; i < event; i++) {
        this.menuItems.push(event)
      }
    }
    this.selectedTabIndex = event - 1;
  }

  refresh() {
    this.generalService.refreshClocked.next(true);
  }
}
