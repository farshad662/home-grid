import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Output() generateTab: EventEmitter<number> = new EventEmitter<number>();
  menuItems = new Array(5);

  goToTab(index: number) {
    this.generateTab.emit(index);
  }
}
