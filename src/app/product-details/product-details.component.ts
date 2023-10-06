import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements  OnInit {
  constructor(private route:ActivatedRoute, private apiServe: ApiService) { }

  path:string ="../../assets/";


  addprod(prod:any):void{
    this.apiServe.addprod(prod);
    console.log(this.apiServe.cart);
  }
  
  
  selectedProduct:any;

  ngOnInit():void{
    let id =parseInt(this.route.snapshot.paramMap.get('id')!) || 1234;
    // console.log("id", id);
    this.apiServe.getMovieById(id).subscribe({next:(response)=>{
      this.selectedProduct=response;
      // this.products.push(response)
      console.log(this.selectedProduct);
    }});

    }
}
