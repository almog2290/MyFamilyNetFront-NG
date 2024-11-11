import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient ,HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.route.module';
import { FormsModule } from '@angular/forms'; 

// Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { RecomendedComponent } from './components/recomended/recomended.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { CommentsDialogComponent } from './components/comments-dialog/comments-dialog.component';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';

// Services
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpTokenInterceptorService } from './services/interceptor/http-token-interceptor.service';



export function kcFactory(kcService: KeycloakService) {
    return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RecomendedComponent,
    CatalogPageComponent,
    CommentsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // PrimeNG Modules
    CardModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    AvatarModule,
    MenuModule,
    TooltipModule,
    DataViewModule,
    RatingModule,
    TagModule, 
    DialogModule,
    DynamicDialogModule,
    InputTextareaModule,
    FieldsetModule,
    DividerModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptorService,
      multi: true
    },
    {
        provide: APP_INITIALIZER,
        deps: [KeycloakService],
        useFactory: kcFactory,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }