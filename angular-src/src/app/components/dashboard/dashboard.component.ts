import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  users: string[] = []; 

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getDashboardData().subscribe((data: any) =>  {
      console.log(data);
      this.userCount = data.userCount;
      this.users = data.users.map((user: any) => user.name)
    },
    err => {
      console.log(err);
    });
  }
}
