import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500/';
  path:string ="../../assets/";
  cart!: any;
  constructor(private apiServe: ApiService, private router: Router) {
    this.cart = this.apiServe.cart;
  }
  ngOnInit(): void {
    this.cart = this.apiServe.cart;
  }
  deleteprod(prod:any):any{
    this.apiServe.deleteprod(prod);
    this.cart = this.apiServe.cart;
  }
}
