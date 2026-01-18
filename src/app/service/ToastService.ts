import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastrOptions {
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  private messages = new Subject<ToastrOptions>();
  messages$ = this.messages.asObservable();

  showToastr(options: ToastrOptions) {
    // Ensure default values for optional properties like position and duration
    const toastrMessage: ToastrOptions = {
      title: options.title ?? undefined, // Set undefined if not provided
      message: options.message,
      type: options.type,
      position: options.position || 'top-right', // Default to 'top-right' if position is not provided
      duration: options.duration || 3000 // Default duration of 3 seconds
    };

    this.messages.next(toastrMessage);
  }
}
