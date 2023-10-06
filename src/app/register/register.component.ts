import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email!: string;
  password!: string;


  word!: string;

  constructor(private apiServe: ApiService, private router: Router) { }
  ngOnInit():void { 
  }

  onSubmit():void {    
    this.apiServe.register({      
      email: this.email,
      password: this.password,
      })
        .subscribe((response) => {
          this.word = response.word;
          this.router.navigate([response.route]);
          console.log(response);
        });
  }

}
