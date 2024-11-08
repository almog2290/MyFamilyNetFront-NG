import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  url= `${environment.apiUrl}/social/public/pages`;

  constructor(private http: HttpClient) { }

  getAllPages(offset: number , size: number): Observable<Page[]> {
    const reponse = this.http.get<Page[]>(`${this.url}?page=${offset}&size=${size}`);
    return reponse ?? [];
  }

  getPageById(id: string): Observable<Page | undefined> {
    const response = this.http.get<Page>(`${this.url}/${id}`);
    return response ?? {};
  }
}
