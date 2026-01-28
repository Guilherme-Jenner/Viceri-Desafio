import { Component, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-popup-confirmation',
  imports: [],
  templateUrl: './popup-confirmation.html',
  styleUrl: './popup-confirmation.css',
})
export class PopupConfirmation {
  @Input() 
  title: string = '';
  
  @Input()
  message: string = '';


  constructor(private globalService: GlobalService) {}

  confirmAction(): void {
    this.globalService.resolveConfirmation(true);
  }

  cancelAction(): void {
    this.globalService.resolveConfirmation(false);
  }

}
