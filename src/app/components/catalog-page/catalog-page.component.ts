import { Component , inject , OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Page } from '../../models/page';
import { Post } from '../../models/post';
import { CommentsDialogComponent } from '../comments-dialog/comments-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css',
  providers: [DialogService]
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  page: Page | undefined;
  posts: Post[] = [];
  dialogRef: DynamicDialogRef | undefined;
  editingPost: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private dialogService: DialogService,
  ) {}
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = JSON.parse(params['page']);
        this.loadPagePosts();
      }
    });
  }

  private loadPagePosts() {
    if (this.page) {
      this.postService.getAllPostsByPageId(this.page.id, 0, 10)
      .subscribe(posts=> {
        this.posts = posts;
      });
    }
  }

  showComments(post: Post) {
    this.dialogRef = this.dialogService.open(CommentsDialogComponent, {
      header: 'Comments',
      width: '100%',
      height: '75%',
      position: 'bottom',
      modal: true,
      data: {
        postId: post.postId
      },
      baseZIndex: 10000,
      styleClass: 'comments-dialog'
    });

    if (this.dialogRef) {
      this.dialogRef.onChildComponentLoaded.subscribe((component: CommentsDialogComponent) => {
        component.commentAdded.subscribe(() => {
          const index = this.posts.findIndex(p => p.postId === post.postId);
          if (index !== -1) {
            this.posts[index].comments++;
          }
        });
      });
    }
  }

  startEdit(post: Post) {
    this.editingPost = { ...post };
  }

  saveEdit() {
    if (this.editingPost) {
      this.postService.updatePost(this.editingPost.postId, this.editingPost)
      .subscribe(response => {
        if (response.status === 201) {
          this.loadPagePosts();
        }
       });
      this.editingPost = undefined;
    }
  }

  cancelEdit() {
    this.editingPost = undefined;
  }

  likePost(post: Post) {
    console.log('Like post');
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
