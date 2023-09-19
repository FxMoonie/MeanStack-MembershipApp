import { ValidateService } from '../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private snackBar: MatSnackBar  
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

    return true;
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error'], 
    });
  }

}


