import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ContactFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Contact</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-contact-form
          (formSubmitted)="addContact($event)"
        ></app-contact-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddContactComponent {
  constructor(
    private router: Router,
    private contactService: ContactService
  ) {}

  //Task 3.1 starts...
  addContact(contact: Contact){
    this.contactService.createContact(contact).subscribe({
      next: () =>{
        this.router.navigate(['/']);
      },
      error: (error) =>{
        alert('Failed to create a contact');
        console.error(error);
      },
    });
    this.contactService.getContacts();
  }
  //Task 3.1 ends.
}
