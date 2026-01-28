import { Injectable, signal } from '@angular/core';
import { IToastOptions } from '../toast/models/toast-options.model';

export interface IConfirmationOptions {
  title: string;
  message: string;
  resolve?: (result: boolean) => void;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private toastOptions = signal<IToastOptions | null>(null);
  private toastVisible = signal<boolean>(false);
  private timeoutVerification: any;

  private confirmationState = signal<IConfirmationOptions | null>(null);

  showConfirmation(options: {title: string, message: string}): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationState.set({
        title: options.title,
        message: options.message,
        resolve: resolve
      });
    });
  }

  resolveConfirmation(result: boolean) {
    const state = this.confirmationState();
    if (state && state.resolve) {
      state.resolve(result);
    }
    this.confirmationState.set(null);
  }

  getConfirmationState() {
    return this.confirmationState.asReadonly();
  }

  showToast(options: IToastOptions) {
    this.toastOptions.set(options);
    this.toastVisible.set(true);

    if (this.timeoutVerification) {
      clearTimeout(this.timeoutVerification);
    }

    this.timeoutVerification = setTimeout(() => {
      this.toastVisible.set(false);
    }, 3000);
  }

  getToastOptions() {
    return this.toastOptions.asReadonly();
  }

  isToastVisible() {
    return this.toastVisible.asReadonly();
  }
}
