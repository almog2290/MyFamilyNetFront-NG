import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable , from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptorService implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.keycloakService.updateToken()).pipe(
      switchMap(() => {
        const token = this.keycloakService.keycloak.token;
        if (token) {
          const authReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
          });
          return next.handle(authReq);
        }
        return next.handle(request);
      })
    );
  }

}
