import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-modalpopup',
  styleUrl: './modalpopup.css',
  templateUrl: './modalpopup.html',
})
export class Modalpopup {

  @Input() isOpen = false;
  @Input() title = 'Modal Popup';
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

}
