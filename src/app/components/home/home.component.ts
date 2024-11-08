import { Component , inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageList: Page[] = [];
  pageService: PageService = inject(PageService);
  router: Router = inject(Router);

  constructor() {
    this.pageService.getAllPages(0,6)
    .subscribe((pages) => {
      this.pageList = pages;
    });
  }

  viewPage(page: Page) {
    this.router.navigate(['/catalog-page'], { queryParams: { page: JSON.stringify(page) } });
  }
}
