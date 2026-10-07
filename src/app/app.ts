import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, AsyncPipe, FormsModule, ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('RajAngular1');
  http = inject(HttpClient);

  contacts$ = this.getContacts();

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
            this.contacts$ = this.getContacts();
            this.contactsForm.reset();
           }
        })
   }

   onDelete(id:string){
      this.http.delete(`https://localhost:7183/api/Contacts/${id}`)
        .subscribe({
          next: (value) => {
            alert('Record Deleted');
            this.contacts$ = this.getContacts();
          }
        })
   }

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7183/api/Contacts');

  }


}
