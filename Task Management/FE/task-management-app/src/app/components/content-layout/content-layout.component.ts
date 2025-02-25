import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  imports: [MatSidenavModule, MatIconModule, MatListModule, RouterOutlet, RouterModule, CommonModule],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css'
})
export class ContentLayoutComponent {
  constructor(public authService: AuthService, private router: Router) {}
  authSubscription!: Subscription;
  user: any = {};
   ngOnInit() {
     this.user = this.authService.getUserSession();
     console.log(this.user, 'aaaa')
   }

  logout(): void {
    this.authService.logout();
    // this.username = null;
    // this.router.navigate(['/']);
  }

}
