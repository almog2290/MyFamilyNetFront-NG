import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { RecomendedComponent } from './components/recomended/recomended.component';
import { GuardService } from "./services/guard/guard.service";
import { CatalogPageComponent } from "./components/catalog-page/catalog-page.component";

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'recommended',
        component: RecomendedComponent,
        canActivate: [GuardService],
        title: 'Recomended Pages'
    },
    {
        path: 'catalog-page',
        component: CatalogPageComponent,
        canActivate: [GuardService],
        title: 'Catalog Page'
    }
  ];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }