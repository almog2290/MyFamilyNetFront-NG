import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByPostId(postId: string , offset: number , size: number): Observable<Comment[]> {
    const url = `${environment.apiUrl}/social/posts/${postId}/comments?page=${offset}&size=${size}`;
    return this.http.get<Comment[]>(url);
  }

  addComment( postId: string , description : string ): Observable<void> {
    const url = `${environment.apiUrl}/social/comments/post/${postId}`;
    return this.http.post<void>(url, { description });
  }

  editComment(commentId: string, description: string): Observable<void> {
    const url = `${environment.apiUrl}/social/comments/${commentId}`;
    return this.http.put<void>(url, { description });
  }

  deleteComment(commentId: string): Observable<void> {
    const url = `${environment.apiUrl}/social/comments/${commentId}`;
    return this.http.delete<void>(url);
  }

}
