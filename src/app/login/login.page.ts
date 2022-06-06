import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


Username = '';
Password = '';
Database = '';

errorMessage:string = "";

KyribaToken : any = {
  "access_token": "not set",
  "token_type": "not set",
  "expires_in": "not set",
  "scope": "not set",
  "kapp_username": "not set"
}


  constructor(private http: HttpClient, private router: Router) { 

  }


  LoginClicked(): void {
  
    this.login(this.Username, this.Password, this.Database).subscribe(
      data => {
        
        this.KyribaToken.access_token = data.access_token;
        this.KyribaToken.scope = data.scope;
        this.KyribaToken.kapp_username = data.kapp_username;
        this.KyribaToken.token_type = data.token_type;
        this.KyribaToken.expires_in = data.expires_in;
  
  
        this.SaveUserToken();
        
        console.log('token is ' + this.KyribaToken.access_token);

       this.router.navigate(['/tabs']);
  
  
      },
      err => {
  
  
        this.errorMessage = err.error.message;
        
      }
    );
  }
  
  
  

  login(Username:string, Password:string, Database:string): Observable<any> {
    
    let authorizationData = 'Basic ' + btoa(Database.toUpperCase() + '@' + Username.toUpperCase() + ':' + Password);
    
    var headers = new HttpHeaders({
      
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authorizationData,
      'grant_type':'client_credentials',
      'username': Database.toUpperCase() + '@' + Username.toUpperCase(),
      'password': Password

    }
      
    );


    const body = new HttpParams()
          .set('username', Database.toUpperCase() + '@' + Username.toUpperCase())
          .set('password', Password)
          .set('grant_type', 'client_credentials');
  
    
          return this.http.post<any>('https://demo.kyriba.com/gateway/oauth/token', body,  { headers:headers })
  
  
  }

  

  SaveUserToken() {

    window.localStorage.setItem('access_token', this.KyribaToken.access_token);
    window.localStorage.setItem('kapp_username', this.KyribaToken.kapp_username);
    window.localStorage.setItem('expires_in', this.KyribaToken.expires_in);
    
    //Check to see if the browser storage has the token saved.
    
    
      }


      ClearUserToken() {

        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('kapp_username');
        window.localStorage.removeItem('expires_in');
        
        //Check to see if the browser storage has the token saved.
        
        
          }

  ngOnInit() {
  }

}
