import { Injectable , inject } from '@angular/core';
import { Router } from '@angular/router';
import Keycloak from 'keycloak-js';
import { KeycloakProfile } from 'keycloak-js';


@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile:  KeycloakProfile | undefined;

  constructor(private router: Router) {}

  get keycloak(){

    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'http://localhost:9082',
        realm: 'my-family-net',
        clientId: 'my-family-net-app'
      });
    }

    return this._keycloak;
  }

  get profile(): KeycloakProfile | undefined {
    return this._profile
  }

  get myUserId(): string | undefined {
    return this._profile?.id;
  }

  async init() {
    
    const authenticated : boolean = await this.keycloak?.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });

    if(authenticated){
      this._profile = await this._keycloak?.loadUserProfile();
    }
  }

  async updateToken(): Promise<void> {
    if (this.keycloak) {
      try {
        await this.keycloak.updateToken(30); // Refresh the token if it will expire in less than 30 seconds
      } catch (error) {
        this.router.navigate(['/']); // Redirect to the homepage
      }
    }
  }

  register(): Promise<void> {
    return this.keycloak?.register();
  }

  login(): Promise<void> {
    return this.keycloak?.login();
  }

  logout(): Promise<void> {
    return this.keycloak?.logout({
      redirectUri: "http://localhost:4200"
    });
  }  
}
