import {Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  credentials = {username: '', password: ''};
 authBtnText: String = '';
  mode: 'login' | 'register' = 'login';
  showSignup: boolean = false;
  hidePassword: boolean = true;
  accountText: string = '';
  actionBtn: String = '';


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){
    const navigation = this.router.getCurrentNavigation();
    console.log('nav', navigation)
    if (navigation?.extras.state) {
      const state = navigation.extras.state;
      this.mode = state['mode'] || 'login';
      this.authBtnText = state['authBtnText'] || 'Login';
      this.showSignup = state['showSignup'] ?? true;
    }
  }

  ngOnInit(): void {
    if (!this.mode) {
      this.route.queryParams.subscribe(params => {
        this.mode = params['mode'] || 'login';
        this.authBtnText = params['authBtnText'] || 'Login';  
        this.showSignup = params['showSignup'] === 'true';
      });
    }
  
    this.updateUI();
  }

  private updateUI(): void {
    if (this.mode === 'login') {
      this.accountText = "Don't have an account?";
      this.actionBtn = "Sign Up";
    } else {
      this.accountText = "Already have an account?";
      this.actionBtn = "Sign In";
    }
  }

  onAuthClick() {
    if(this.mode === 'login'){
      this.login();
    } else {
      this.register();
    }
  }

  authNav() {
    if(this.mode === 'login'){
      this.router.navigate(['/register'], { 
        state: { 
          mode: 'register', 
          authBtnText: 'Register', 
          showSignup: false 
        } 
      });
    }
    else {
      this.router.navigate(['/login'], { 
        state: { 
          mode: 'login', 
          authBtnText: 'Login', 
          showSignup: true 
        } 
      });
    }
    
  }

  login() {
    this.authService.login(this.credentials).subscribe(response => {
      localStorage.setItem('user', JSON.stringify(response));
      alert("Login successfull!");
      this.router.navigate(['/dashboard']);
    }, error => {
      alert('Invalid username or password');
    })
  }

    register() {
      (this.credentials as any)['role'] = 'USER';
      console.log(this.credentials);
      this.authService.register(this.credentials).subscribe((response: any) => {
        console.log(response)
        this.router.navigate(['/login'], {
          queryParams: {
            mode: 'login',
            authBtnText: 'Login',
            showSignup: 'true'
          }
        });
      }, error => {
        console.error('Error in Registering the user', error);
      })
    }

}



