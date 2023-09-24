import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UserProfile {
  name: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;


  constructor(
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit() { 
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = {
        name: profile.user.name,
        username: profile.user.username,
        email: profile.user.email
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  deleteUser() {
    if (confirm("Are you sure you want to delete your account? Note that this cannot be undone!")) {
      this.authService.deleteUser().subscribe(
        (data: any) => {
          if (data.success) {
            this.router.navigate(['/login']);
            this.showSnackBar('Your account has been successfully deleted');
          } else {
            console.log(data.msg);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}

