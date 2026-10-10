import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  selector: 'app-contactcomponent',
  styleUrl: './contactcomponent.css',
  templateUrl: './contactcomponent.html',
})
export class Contactcomponent {

  http = inject(HttpClient);
  contacts$ = this.getContacts();
  
  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://localhost:7183/api/Contacts');

  }

  onDelete(id:string){
      this.http.delete(`https://localhost:7183/api/Contacts/${id}`)
        .subscribe({
          next: (value) => {
            alert('Member Deleted');
            this.contacts$ = this.getContacts();
          }
        })
   }

}
