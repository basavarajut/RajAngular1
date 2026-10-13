import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
  contactList$ = this.getContacts();

  selectedContact: Contact | null = null;

  
  
  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7289/api/Contacts/GetAllContacts');
  }

  onDelete(id:string){
      this.http.delete(`https://localhost:7289/api/Contacts/DeleteContact/${id}`)
        .subscribe({
          next: (value) => {
            alert('Member Deleted');
            this.contactList$ = this.getContacts();
          }
        })
   }

   //Edit Contact *****************
   onContactSaved(updatedContact: Contact): void {
    if (!this.selectedContact) {
      return;
    }

    this.http.put<Contact>(`https://localhost:7289/api/Contacts/UpdateContact/${updatedContact.id}`,updatedContact
    ).subscribe({
      next: (response) => {
        alert('Contact updated successfully');

        // Refresh the contact list
        this.contactList$ = this.getContacts();

        // Close the modal
        this.selectedContact = null;
      },
      error: (error) => {
        console.error('Error updating contact:', error);
        alert('Failed to update contact');
      }
    });
    
  }

  

  //Edit Contact *****************

   //Start Modal Popup **************

   isModalOpen = false;
    openModal(contact:any): void {
    this.selectedContact = { ...contact };
    this.isModalOpen = true;

  }
  closeModal() {
    this.isModalOpen = false;
  }

  //End Modal Popup **************


  
}
