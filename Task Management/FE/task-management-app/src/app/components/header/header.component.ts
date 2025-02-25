import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
  username: string | null = null;
  authSubscription!: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   this.authService.isLoggedIn$.subscribe((status: boolean) => {
  //     this.isLoggedIn = status;
  //     console.log(status);
  //     const user = this.authService.getUserSession();
  //     this.username = user ? user.username : null;
  //   });
  // }

  ngOnInit(): void {
    this.username = this.isLoggedIn ? this.authService.getUserSession()?.username : null;
  }

  // updateLoginStatus() {
  //   this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedIn) => {
  //     console.log(loggedIn)
  //     this.isLoggedIn = loggedIn;
  //     this.username = this.isLoggedIn ? this.authService.getUserSession()?.username : null;
  //   });
  //   this.isLoggedIn = this.authService.hasValidSession();
  //   this.username = this.isLoggedIn ? this.authService.getUserSession()?.username : null;
  // }


  logout(): void {
    this.authService.logout();
    // this.username = null;
    this.router.navigate(['/login']);
  }

  // ngOnDestroy(): void {
  //   this.authSubscription.unsubscribe(); // Prevent memory leaks
  // }
}
