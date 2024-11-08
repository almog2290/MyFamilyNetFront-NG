import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient ,HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.route.module';

// Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { RecomendedComponent } from './components/recomended/recomended.component';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

// Services
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpTokenInterceptorService } from './services/interceptor/http-token-interceptor.service';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';



export function kcFactory(kcService: KeycloakService) {
    return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RecomendedComponent,
    CatalogPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    BrowserAnimationsModule,
    HttpClientModule,
    // PrimeNG Modules
    CardModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    AvatarModule,
    MenuModule,
    TooltipModule
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