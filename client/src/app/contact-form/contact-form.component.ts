import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule here
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  styles: `
    .contact-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="contact-form"
      autocomplete="off"
      [formGroup]="contactForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        <mat-error *ngIf="name.invalid && (name.dirty || name.touched)">
          Name must be at least 3 characters long.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Phone</mat-label>
        <input matInput placeholder="Phone" formControlName="Phone" required />
        <mat-error *ngIf="Phone.invalid && (Phone.dirty || Phone.touched)">
          Phone must be a valid number.
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput placeholder="Email" formControlName="email" required />
        <mat-error *ngIf="email.invalid && (email.dirty || email.touched)">
          Please enter a valid email address.
        </mat-error>
      </mat-form-field>

      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="contactForm.invalid"
      >
        Save
      </button>
    </form>
  `,
})
export class ContactFormComponent {
  @Input() set initialState(value: Contact | undefined) {
    if (value) {
      this.contactForm.setValue({
        name: value.name || '',
        Phone: value.Phone?.toString() || '',
        email: value.email || '',
      });
    }
  }

  @Output() formSubmitted = new EventEmitter<Contact>();

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    Phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private formBuilder: FormBuilder) {}

  get name() {
    return this.contactForm.get('name')!;
  }

  get Phone() {
    return this.contactForm.get('Phone')!;
  }

  get email() {
    return this.contactForm.get('email')!;
  }

  submitForm() {
    if (this.contactForm.valid) {
      const contact: Contact = {
        name: this.name.value!,
        Phone: parseInt(this.Phone.value!, 10),
        email: this.email.value!,
        _id: this.initialState?._id,
      };
      this.formSubmitted.emit(contact);
    }
  }
}
