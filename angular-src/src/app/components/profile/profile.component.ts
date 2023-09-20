import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

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
    private router:Router
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
  }

