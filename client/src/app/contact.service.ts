import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'http://localhost:5200';
  contacts$ = signal<Contact[]>([]);
  contact$ = signal<Contact>({} as Contact);

  constructor(private httpClient: HttpClient) { }

  private refreshContacts() {
    this.httpClient.get<Contact[]>(`${this.url}/contacts`)
      .subscribe(contacts => {
        this.contacts$.set(contacts);
      });
  }

  getContacts() {
    this.refreshContacts();
    return this.contacts$();
  }

  getContact(id: string) {
    this.httpClient.get<Contact>(`${this.url}/contacts/${id}`).subscribe(contact => {
      this.contact$.set(contact);
      return this.contact$();
    });
  }

  createContact(contact: Contact) {
    return this.httpClient.post(`${this.url}/contacts`, contact, { responseType: 'text' });
  }

  updateContact(id: string, contact: Contact) {
    const { _id, ...contactWithoutId } = contact;  // Exclude _id from the update payload
    return this.httpClient.put(`${this.url}/contacts/${id}`, contactWithoutId, { responseType: 'text' });
  }

  deleteContact(id: string) {
    return this.httpClient.delete(`${this.url}/contacts/${id}`, { responseType: 'text' });
  }
}
