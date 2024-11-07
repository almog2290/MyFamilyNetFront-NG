import { Injectable } from '@angular/core';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  url = 'http://localhost:3000/pages';

  constructor() { }

  async getAllPages(): Promise<Page[]> {
    const response = await fetch(this.url); 
    return await response.json() ?? [];
  }

  async getPageById(id: string): Promise<Page | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    return await response.json() ?? {};
  }
}
