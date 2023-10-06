import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit {
  mail!: string;
  pw!: string;
  word!: string;
  constructor(private apiServe: ApiService, private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit():void {    
    this.apiServe.login({
        email: this.mail,
        password: this.pw
      })
        .subscribe((response) => {
          this.apiServe.setIsAuthenticated(response.isAuthenticated);
          this.word = response.word;

          //console.log(response);
          if (response.route) {
            this.router.navigate([response.route]);
          }
        });
  }
}
