import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Top Rated', icon: 'flash_on', url: './list', },
    { label: 'List by Genres', icon: 'subject', url: './genre' },
    { label: 'Find', icon: 'search', url: './search' },
  ]


  constructor(
    private authService : AuthService,
    private router : Router){ }

    onClick() : void {
      this.authService
    }

    onLogout() : void {
      this.authService.doLogout()
      this.router.navigate(['/auth/login'])
    }

    get user() : User | undefined{
      return this.authService.getCurrentUser()
    }
}
