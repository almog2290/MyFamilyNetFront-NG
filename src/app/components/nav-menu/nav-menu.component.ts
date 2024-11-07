import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  items: MenuItem[] = [];
  profileItems: MenuItem[] = [];
  userProfileInfo: KeycloakProfile | undefined;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Recommended',
        icon: 'pi pi-star',
        routerLink: '/recommended'
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: '/settings'
      }
    ];
    
    this.updateProfileMenuAndInfo();
  }

  updateProfileMenuAndInfo() {
    if(this.keycloakService.keycloak?.authenticated) {
      this.userProfileInfo = this.keycloakService.keycloak?.profile;
      this.profileItems = [
        {label: 'Profile', icon: 'pi pi-user'},
        {label: 'Settings', icon: 'pi pi-cog'},
        {label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout()}
      ];
    }
    else {
      this.userProfileInfo = undefined;
      this.profileItems = [
        {label: 'Login', icon: 'pi pi-sign-in', command: () => this.login()}
      ];
    }      
  }

  async login() {
    await this.keycloakService.login();
  }

  async logout() {
    await this.keycloakService.logout();
  }
  
}
