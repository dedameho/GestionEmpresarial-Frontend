import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  showSuccessToast(message: string) {
    this.showToast('success', message);
  }

  showErrorToast(message: string) {
    this.showToast('error', message);
  }

  showToast(type: string, message: string) {
    const toast = {
      type,
      message
    };

    this.toasts.push(toast);

    setTimeout(() => {
      this.removeToast(toast);
    }, 5000);
  }

  removeToast(toast: any) {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }
}
