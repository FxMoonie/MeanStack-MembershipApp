import { ValidateService } from '../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name!: string;
  username!: string;
  email!: string;
  password!: string;



  constructor(
    private validateService: ValidateService,
    private snackBar: MatSnackBar,
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name, 
      email: this.email, 
      username: this.username, 
      password: this.password 
    };

    if(!this.validateService.validateRegister(user)){
      this.showSnackBar('Please fill in all fields');
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.showSnackBar('Please use a valid email');
      return false;
    }

    this.authService.registerUser(user).subscribe((data: any) => {
      if(data.success){
        this.showSnackBar('You are now registered');
        this.router.navigate(['/login']);
      } else {
        this.showSnackBar('Something went wrong');
        this.router.navigate(['/register']);
      }
    });

    return true;
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error'], 
    });

  }

}


