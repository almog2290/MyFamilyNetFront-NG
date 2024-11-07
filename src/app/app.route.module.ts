import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { RecomendedComponent } from './components/recomended/recomended.component';
import { GuardService } from "./services/guard/guard.service";

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
    }
  ];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }