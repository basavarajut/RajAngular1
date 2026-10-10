import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, AsyncPipe, FormsModule, ReactiveFormsModule],
  selector: 'app-newcontact',
  styleUrl: './newcontact.css',
  templateUrl: './newcontact.html',
})
export class Newcontact {

  http = inject(HttpClient);

  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  })

  onFormSubmit () {
        const addContactRequest = {
          name: this.contactsForm.value.name,
          email: this.contactsForm.value.email,
          phone: this.contactsForm.value.phone,
          favorite: this.contactsForm.value.favorite
        }
        this.http.post('https://localhost:7183/api/Contacts', addContactRequest)
          .subscribe({
             next: (value) => {
              console.log(value);
              //this.contacts$ = this.getContacts();
              alert('Member Added');
              this.contactsForm.reset();
             }
          })
     }


}
