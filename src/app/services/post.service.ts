import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  updatePost(postId: string, post: Post): Observable<HttpResponse<Post>> {
    const url = `${environment.apiUrl}/social/posts/${postId}`;
    return this.http.put<Post>(
      url, 
      {description: post.description},
      { observe: 'response' }
    );
  }

}
