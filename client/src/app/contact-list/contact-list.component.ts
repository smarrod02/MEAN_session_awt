import { Component, OnInit, WritableSignal } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Contacts List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="contacts$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-phone">
            <th mat-header-cell *matHeaderCellDef>Phone</th>
            <td mat-cell *matCellDef="let element">{{ element.Phone }}</td>
          </ng-container>
          <ng-container matColumnDef="col-email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let element">{{ element.email }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteContact(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Contact
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ContactListComponent implements OnInit {
  contacts$ = {} as WritableSignal<Contact[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-phone',
    'col-email',
    'col-action',
  ];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.fetchContacts();
  }

  deleteContact(id: string): void {
    this.contactService.deleteContact(id).subscribe({
      next: () => this.fetchContacts(),
    });
  }

  private fetchContacts(): void {
    this.contacts$ = this.contactService.contacts$;
    this.contactService.getContacts();
  }
}
