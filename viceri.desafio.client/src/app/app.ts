import { Component, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IConfirmationOptions, GlobalService } from './shared/services/global.service';
import { PopupConfirmation } from './shared/components/popup-confirmation/popup-confirmation';
import { Header } from './shared/components/header/header';
import { Toast } from './shared/components/toast/toast';
import { IToastOptions } from './shared/components/toast/models/toast-options.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Toast, PopupConfirmation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  protected title = 'Hero Creator';
  isToastVisible!: Signal<boolean>;
  toastOptions!: Signal<IToastOptions | null>;
  confirmationState!: Signal<IConfirmationOptions | null>;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.isToastVisible = this.globalService.isToastVisible();
    this.toastOptions = this.globalService.getToastOptions();
    this.confirmationState = this.globalService.getConfirmationState();
  }
}
