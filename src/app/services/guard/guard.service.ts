import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) { }

  canActivate(): boolean {

    if (this.keycloakService.keycloak.isTokenExpired()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
