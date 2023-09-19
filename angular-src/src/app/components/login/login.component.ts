import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(
  private authService:AuthService,
  private router:Router,
  private snackBar: MatSnackBar
    ) { }

  ngOnInit(){
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe((data: any) => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.showSnackBar('You are now logged in');
        this.router.navigate(['dashboard']);
      } else {
        this.showSnackBar(data.msg);
        this.router.navigate(['login']);
      }
    });
  }
    private showSnackBar(message: string) {
      this.snackBar.open(message, 'Close', {
        duration: 5000,
        panelClass: ['error'], 
      });
    
  }
  }
