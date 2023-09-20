import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.showSnackBar('You are logged out');
    this.router.navigate(['/login']);
    return false;

  }
  
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error'], 
    });

  }
}
