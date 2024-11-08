import { Component , inject , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';
import { Post } from '../../models/post';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  pageService: PageService = inject(PageService);
  page: Page | undefined;
  posts: Post[] = [];

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
      this.posts = [
        {
          likes: 0,
          comments: 1,
          followers: 0,
          description: "Which is the funniest childhood story of ours",
          edited: false,
          createdAt: new Date("2024-08-25T16:32:01.0266199"),
          postId: "08a2f647-19e9-46a3-9030-8f461b3d9632",
          pageId: "d77f4e8c-f02c-42f3-bebe-f1ccd12e43ae",
          ownerName: "Almog Madar",
          title: "Family Stories",
          logo: ""
        },
        {
          likes: 0,
          comments: 1,
          followers: 0,
          description: "Which is the funniest childhood story of ours",
          edited: false,
          createdAt: new Date("2024-08-25T16:32:01.0266199"),
          postId: "08a2f647-19e9-46a3-9030-8f461b3d9632",
          pageId: "d77f4e8c-f02c-42f3-bebe-f1ccd12e43ae",
          ownerName: "Almog Madar",
          title: "Family Stories",
          logo: ""
        },
      ];
    }
  }

}
