import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  allMovies: any[] = [];
  allData: any[] = [];
  lang: string = 'en-US';

  path:string ="../../assets/";
  //late
  totalmovies!: number;
  m:number=100;
  
  moviesPerPage: number = 21;

  private searchval: string = '';
  showMoviesDetails: boolean = true;

  currentPage: number = 1;
 

  constructor(private movieService: ApiService) { }

  ngOnInit(): void {
    //next,error,complete
    this.movieService.getAllMovies(this.currentPage, this.moviesPerPage).subscribe({
      next: (response) => {
        // console.log(response.products);
        this.allMovies = response.products;
        this.allData = this.allMovies;
        this.totalmovies = response.totalProducts;
        // console.log("total", this.totalmovies, response);
    
      },
    });
  }

  toggleDetails(movieId: number) {
    // console.log(movieId);

    for (const item of this.allMovies) {
      if (item.id == movieId) {
        item.toggleDiscription = !item.toggleDiscription;
      }
    }
  }
  set searchValue(value: string) {
    this.searchval = value;
    console.log(value);
    this.searchallProducts(value);
  }
  searchallProducts(producttitle: string) {
    if(producttitle==''){
      this.movieService.getAllMovies(this.currentPage, this.moviesPerPage).subscribe({
        next: (response) => {
          // console.log(response.products);
          this.allMovies = response.products;
          this.allData = this.allMovies;
          this.totalmovies = response.totalProducts;
        },
      });
    }
    else{
      
      
   this.allMovies= this.allData.filter(function(item){
      if(item.title.toLocaleLowerCase().includes(producttitle.toLocaleLowerCase())){
        return item;
      }
      }
      )
      console.log(this.allMovies);
      console.log(producttitle);
    }
    }

  
  // searchallProducts(movieTitle: string) {
  //   this.movieService.searchAllMovie(movieTitle).subscribe({
  //     next: (response) => {
  //       this.allMovies = response.results;
  //       this.allData = this.allMovies;
  //       console.log(this.allMovies);

  //     },
  //   });
  // }

  // changeLanguage() {
  //   this.lang = this.lang == 'en-Us' ? 'ar-SA' : 'en-Us';
  //   this.movieService.getAllMovies(this.currentPage, this.moviesPerPage).subscribe({
  //     next: (response) => {
  //       this.allMovies = response.results;
  //       this.allData = this.allMovies;
  //     },
  //   });
  // }

  changePage(pageData:PageEvent){
    this.currentPage=pageData.pageIndex+1;
    this.moviesPerPage=pageData.pageSize;    
    this.movieService.getAllMovies(this.currentPage,this.moviesPerPage).subscribe({
      next: (data) => {
        // console.log(data);
        this.allMovies = data.products;
        this.totalmovies=data.totalProducts;
      },
    });
    
  }

    
  

  showDetails(itemid : String){

    for(let item of this.allMovies){
        if (item.title == itemid){
            item.showBookDetails = !item.showBookDetails;
    
        }
    }
    
    }

}
