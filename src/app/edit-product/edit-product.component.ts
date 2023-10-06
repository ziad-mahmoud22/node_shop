import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements  OnInit {
  product: any;
  title!: string;
  imageUrl!: string;
  price!: number;
  description!: string;

  word!: string;

  constructor(private router: Router, private route:ActivatedRoute, private apiServe: ApiService) { }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.apiServe.getDetails(id).subscribe({
      next: (response) => {
        this.product = response;
        this.title = this.product.title;
        this.imageUrl = this.product.imageUrl;
        this.price = this.product.price;
        this.description = this.product.description;
      }
    });
  }

  onSubmit():void {    
    this.apiServe.editProduct({     
      productId: this.product._id, 
      title: this.title,
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description
      })
        .subscribe((response) => {
          this.word = response.word;
          this.router.navigate([response.route]);
          console.log(response);
        });
  }

}
