import { Component , inject } from '@angular/core';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageList: Page[] = [];
  pageService: PageService = inject(PageService);

  constructor() {
    this.pageService.getAllPages()
    .then((pages) => {
      this.pageList = pages;
    });
  }
}
