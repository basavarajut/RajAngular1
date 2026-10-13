import { Component, inject, Input, signal, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../models/contact';

@Component({
  imports: [RouterOutlet, AsyncPipe, FormsModule, ReactiveFormsModule],
  selector: 'app-newcontact',
  styleUrl: './newcontact.css',
  templateUrl: './newcontact.html',
})
export class Newcontact {

  @Input() contact: Contact | null = null;
  @Output() onSaved = new EventEmitter<Contact>();
  @Output() cancelled = new EventEmitter<void>();

  http = inject(HttpClient);

  contactsForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    favorite: new FormControl(false, { nonNullable: true })
  })

  onFormSubmit():void {

    if (this.contactsForm.invalid) {
      return;
    }

        // const addContactRequest = {
        //   id: this.contactsForm.value.id,
        //   name: this.contactsForm.value.name,
        //   email: this.contactsForm.value.email,
        //   phone: this.contactsForm.value.phone,
        //   favorite: this.contactsForm.value.favorite
        // }

      const formValue = this.contactsForm.getRawValue();
      
      if (this.isEditMode && this.contact) {
        // Update the existing contact
        const updatedContact = {
          ...this.contact, ...formValue
        };
        this.updateContact(updatedContact);        
     }
  }

    saveContact(contact:Contact){
        this.http.post('https://localhost:7289/api/Contacts/SaveContact', contact)
          .subscribe({
             next: (value) => {
              console.log(value);
              //this.contacts$ = this.getContacts();
              alert('Member Added');
              this.contactsForm.reset();
             }
          })
    }

    updateContact(contact:Contact){
        this.http.put('https://localhost:7289/api/Contacts/UpdateContact', contact)
          .subscribe({
             next: (value) => {
              console.log(value);
              //this.contacts$ = this.getContacts();
              alert('Member Updated');
              this.contactsForm.reset();
             }
          })
    }

    get isEditMode(): boolean {
      return this.contact !== null;
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact']) {
      if (this.contact) {
        // Populate form for editing
        this.contactsForm.patchValue(this.contact);
      } else {
        // Empty form for creating a new contact
        this.contactsForm.reset({
          name: '',
          email: '',
          phone: '',
          favorite: false
        });
      }
    }
  }

}
