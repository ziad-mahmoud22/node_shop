import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any;
  word!: string;

  constructor(private apiServe: ApiService) { }
  ngOnInit(): void {
  }

  set searchValue(word: string) {
    this.word = word;
  }
  execSearch() {
    this.searchBooks(this.word);
  }
  searchBooks(bookTitle: string) {
    this.apiServe.searchBooks(bookTitle).subscribe({
        next: (response) => {
          this.books = response.items;
        },
    });
  }
  showMovieDetails:Boolean = false;
    
  toggleDetails(movieId: any) {
    for (const item of this.books) {
        if(item.id == movieId) {
            item.showMovieDetails =! item.showMovieDetails;
        }
    }
  }
}
