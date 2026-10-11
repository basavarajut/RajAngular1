import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Modalpopup } from '../shared/modalpopup/modalpopup';
import { Newcontact } from '../newcontact/newcontact';

@Component({
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule, Modalpopup, CommonModule, Newcontact, Newcontact],
  selector: 'app-contactcomponent',
  styleUrl: './contactcomponent.css',
  templateUrl: './contactcomponent.html',
})
export class Contactcomponent {

  http = inject(HttpClient);
  contacts$ = this.getContacts();

  
  
  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7289/api/Contacts/GetAllContacts');
  }

  onDelete(id:string){
      this.http.delete(`https://localhost:7289/api/Contacts/DeleteContact/${id}`)
        .subscribe({
          next: (value) => {
            alert('Member Deleted');
            this.contacts$ = this.getContacts();
          }
        })
   }

   //Start Modal Popup **************

   isModalOpen = false;
    openModal(entity:Contact) {
    this.isModalOpen = true;

  }
  closeModal() {
    this.isModalOpen = false;
  }

  //End Modal Popup **************


  
}
