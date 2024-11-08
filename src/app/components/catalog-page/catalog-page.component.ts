import { Component , inject , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  pageService: PageService = inject(PageService);
  page: Page | undefined;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = JSON.parse(params['page']);
      }
    });
  }

}
