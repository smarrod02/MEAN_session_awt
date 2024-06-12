import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
//Task 3.3 starts...
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
//Task 3.3 continues...

export const routes: Routes = [
  { path: '', component: ContactListComponent, title: 'Contacts List' },
  //Task 3.3 continues...
  {path: 'new', component:AddContactComponent},
  {path: 'edit/:id', component:EditContactComponent},
  //Task 3.3 ends.
];
