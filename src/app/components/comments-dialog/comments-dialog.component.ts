import { Component, OnInit, EventEmitter } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { finalize, switchMap } from 'rxjs/operators';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.css'
})
export class CommentsDialogComponent implements OnInit {
  comments: Comment[] = [];
  newComment: string = '';
  postId: string;
  isSubmitting = false;
  commentAdded = new EventEmitter<void>();
  editingCommentId: string | undefined;
  editCommentText: string = '';
  currentUserId: string | undefined;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private commentService: CommentService,
    private keycloakService: KeycloakService
  ) {
    this.postId = this.config.data.postId;
    this.currentUserId = this.keycloakService.myUserId;
  }

  ngOnInit() {
    this.loadComments();
  }

  private loadComments() {
    this.commentService.getCommentsByPostId(this.postId, 0, 10)
    .subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment() {
    if (!this.newComment?.trim() || this.isSubmitting) return;

    this.isSubmitting = true;
    this.commentService.addComment(this.postId, this.newComment).pipe(
      // After adding comment, load the updated comments
      switchMap(() => this.commentService.getCommentsByPostId(this.postId, 0, 10)),
      // Handle final tasks whether success or error
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
        this.newComment = '';
        this.commentAdded.emit();
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      }
    });
  }

  startEditing(comment: Comment) {
    this.editingCommentId = comment.commentId;
    this.editCommentText = comment.comment;
  }

  cancelEditing() {
    this.editingCommentId = undefined;
    this.editCommentText = '';
  }

  saveEdit(commentId: string) {
    if (!this.editCommentText?.trim() || this.isSubmitting) return;

    this.isSubmitting = true;
    this.commentService.editComment(commentId, this.editCommentText).pipe(
      switchMap(() => this.commentService.getCommentsByPostId(this.postId, 0, 10)),
      finalize(() => {
        this.isSubmitting = false;
        this.editingCommentId = undefined;
      })
    ).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error editing comment:', error);
      }
    });
  }

  deleteComment(commentId: string) {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.commentService.deleteComment(commentId).pipe(
      switchMap(() => this.commentService.getCommentsByPostId(this.postId, 0, 10)),
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }
}