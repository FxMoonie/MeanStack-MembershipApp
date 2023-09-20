import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  registerUser(user: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:3000/users/register', user, { headers })
      .pipe(map(res => res));
  }

  authenticateUser(user: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:3000/users/authenticate', user, { headers })
      .pipe(map(res => res));
  }

  getProfile(){
    //this.authToken = this.authToken.replace('JWT ', '');
    const headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    this.loadToken();

    return this.http.get('http://localhost:3000/users/profile', { headers })
      .pipe(map(res => res));
  }

  storeUserData(token: any, user: any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  checkToken(): boolean {
    const token = localStorage.getItem('id_token');
    if (token) {
      const tokenExpirationDate = this.getTokenExpirationDate(token);
      const currentDate = new Date();
      return tokenExpirationDate > currentDate;
    } else {
      return false;
    }
  }

  private getTokenExpirationDate(token: string): Date {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      return new Date(decodedToken.exp * 1000);
    } else {
      return new Date(0); // Token has no expiration date
    }
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

}

