import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  port: number = 3000;
  isAuthenticated: boolean =true;
  
  // session!: any;
  // requestOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   }),
  //   session : this.session
  // };
  
  constructor(private http: HttpClient, private router: Router) { }

  getProduct(): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/products`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/admin/add-product`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/login`, data)
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  getProducts(): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/products`);
  }

  getDetails(id: any): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/products/${id}`);
  }

  searchBooks(bookTitle: string): Observable<any> {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}`);
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(["/"]);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/admin/delete-product`, {productId: id});
  }

  editProduct(newProduct: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/admin/edit-product`, newProduct);
  }


  //Steven

  cart:any[] = [{author: "",
    country: "",
    id: 0,
    imageLink : "",
    language: "",
    link : "",
    pages: 0,
    price: 0,
    title : "",
    year: 0,
    _id:""}];
  addprod(prod:any):void{
    this.cart.push(prod);
}
deleteprod(prod:any):void{
    this.cart = this.cart.filter(item => item !== prod);
  }

  register(data: any): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/signup`, data);
  }

  getAllMovies(pageNumber:number=1,pageSize:number=21): Observable<any> {
    let querydata=`pageNumber=${pageNumber}&pageSize=${pageSize}`
   return this.http.get(`http://localhost:3002/shop/products?${querydata}`);
 }
 getMovieById(prodId: number): Observable<any> {
  // console.log("Getting id")
   return this.http.get(`http://localhost:3002/shop/products/${prodId}`);
  
 }

  searchAllMovie(movieName: string): Observable<any> {
    if (movieName == '') {
      return this.getAllMovies();
    } else {
      return this.http.get(
        `http://localhost:3002/shop/products?query=${movieName}`
      );
    }
  }
  // omar
  // addToCart(productId: number, product:any): Observable<any> {
  //   return this.http.post(
  //     `http://localhost:3002/shop/products/${productId}`, product  
  //   );
  // }
}
