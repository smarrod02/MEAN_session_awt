import { Component, OnInit, WritableSignal } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ContactFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Contact</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-contact-form
          [initialState]="contact()"
          (formSubmitted)="editContact($event)"
        ></app-contact-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditContactComponent implements OnInit {
  contact = {} as WritableSignal<Contact>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.contactService.getContact(id!);
    this.contact = this.contactService.contact$;
  }

  //Task 3.2 starts...

  //Task 3.2 ends
}
