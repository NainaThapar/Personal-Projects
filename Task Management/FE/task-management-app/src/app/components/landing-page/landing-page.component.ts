import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  imports: [MatButtonModule, HeaderComponent, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  isLoggedIn: boolean = false;
  authSubscription!: Subscription;

  constructor(public authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log(loggedIn)
      this.isLoggedIn = loggedIn;
    });
    this.isLoggedIn = this.authService.hasValidSession();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); // Prevent memory leaks
  }

  authNav(page: string, btnText: string, showSignup: boolean) {
    this.router.navigate([`/${page}`], { 
      state: { 
        mode: page, 
        authBtnText: btnText, 
        showSignup: showSignup 
      } 
    });
  }


}
