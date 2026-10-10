import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Newcontact } from './newcontact/newcontact';
import { Contactcomponent } from './contactcomponent/contactcomponent';


@Component({
  imports: [RouterOutlet,   Newcontact, Contactcomponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  
}
