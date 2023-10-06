import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  allProducts: any;
  deleteDialog: boolean = false;

  constructor(private apiServe: ApiService, private router: Router) {
    this.apiServe.getProducts().subscribe((data: any) => {
      this.allProducts = data;
    })
   }
  ngOnInit(): void {
    this.apiServe.getProducts().subscribe((data: any) => {
      this.allProducts = data;
    })
  }
  
  delete(id: string) {
    this.apiServe.deleteProduct(id).subscribe((response: any) => {
      console.log(response);
      if (response.route && this.router.url !== response.route) {
        this.toggleDialog();
        this.router.navigate([response.route]);
        this.apiServe.getProducts().subscribe((data: any) => {
          this.allProducts = data;
        });
      }
    });
  }

  
  toggleDialog() {
    this.deleteDialog = !this.deleteDialog;
  }

}
