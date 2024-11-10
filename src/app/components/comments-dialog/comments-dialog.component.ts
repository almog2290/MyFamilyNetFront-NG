import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.css'
})
export class CommentsDialogComponent implements OnInit {
  comments: Comment[] = [];
  newComment: string = '';
  postId: string;

  constructor(
    private config: DynamicDialogConfig,
    private commentService: CommentService 
  ) {
    this.postId = this.config.data.postId;
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
    if (this.newComment.trim()) {
      this.commentService.addComment( this.postId, this.newComment)
        .subscribe(comment => {
          this.comments.unshift(comment);
          this.newComment = '';
        });
    }
  }
}