import { CommonModule } from '@angular/common';
import { Component, signal, Output, EventEmitter, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-popupcomponent',
  styleUrl: './popupcomponent.css',
  templateUrl: './popupcomponent.html',
})
export class Popupcomponent {


    //isOpen = signal(false);
    @Input() isOpen:boolean = false;
    @Input() title:string = "Add/Edit Contact";
    @Output() closeModal = new EventEmitter<void>();

    close(){
      this.closeModal.emit();
    }

}
