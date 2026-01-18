import { ToastrOptions } from './ToastrOption';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../service/ToastService';

@Component({
  selector: 'MyToastComp',
  templateUrl: './MyToastComp.html',
  styleUrls: ['./MyToastComp.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MyToastComp {

  messages: ToastrOptions[] = [];

  constructor(private toastrService: ToastrService) {
    this.toastrService.messages$.subscribe((msg) => {
      // Ensure the title is either undefined or string, and handle the message correctly
      const validTitle = msg.title ? msg.title : undefined;

      this.messages.push({
        ...msg,
        title: validTitle,
        position: msg.position || 'top-right', // Ensure position is not undefined
        duration: msg.duration || 3000 // Default duration
      });

      setTimeout(() => {
        this.removeMessage(msg);
      }, msg.duration || 3000);
    });
  }

  removeMessage(msg: ToastrOptions) {
    const index = this.messages.indexOf(msg);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }
}