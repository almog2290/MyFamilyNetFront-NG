import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPostsByPageId(pageId: string , offset: number , size: number): Observable<Post[]> {
    const url = `${environment.apiUrl}/social/pages/${pageId}/posts?page=${offset}&size=${size}`;
    const response = this.http.get<Post[]>(url);
    return response ?? [];
  }

}
