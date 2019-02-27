import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service'

enum MOVIE_TYPE {
  POPULAR = "1",
  TOP_RATED = "2",
  UP_COMING = "3"
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeTab : Number = 1;
  DEFAULT_PAGE : string = "1"

  isPopularMovieLoading : Boolean = false
  isTopRatedMovieLoading : Boolean = false
  isUpcomingdMovieLoading : Boolean = false
  
  popularMovies = []
  topRatedMovies = []
  upcomingdMovies = []

  popularTrack = {}
  topRatedTrack = {}
  upcomingTrack = {}
  

  constructor(private movieService : MovieService) { }

  ngOnInit() {
    this.isPopularMovieLoading  = true
    this.isTopRatedMovieLoading = true
    this.isUpcomingdMovieLoading = true

    this.movieService.getMovies(MOVIE_TYPE.POPULAR,this.DEFAULT_PAGE).then(data => {      
      this.popularMovies = data['results']
      this.popularTrack = data
      this.isPopularMovieLoading  = false
    });
    this.movieService.getMovies(MOVIE_TYPE.TOP_RATED,this.DEFAULT_PAGE).then(data => {      
      this.topRatedMovies = data['results']
      this.topRatedTrack = data
      this.isTopRatedMovieLoading = false
    });
    this.movieService.getMovies(MOVIE_TYPE.UP_COMING,this.DEFAULT_PAGE).then(data => {      
      this.upcomingdMovies = data['results']
      this.upcomingTrack = data
      this.isUpcomingdMovieLoading = false
    });
  }

  onScroll() {
    switch(this.activeTab) {
      case 1 :  this.loadPopularMovies()
                break
      case 2 :  this.loadTopRatedMovies()
                break
      case 3 :  this.loadComingMovies()
                break
      default : break
    }
  }

  loadPopularMovies() : void {    
    var page = ''
    if (this.popularTrack['page'] < this.popularTrack['total_pages']) {
      page = this.popularTrack['page'] + 1 + ''
    }
    if (page !== '') {
      this.isPopularMovieLoading  = true
      this.movieService.getMovies(MOVIE_TYPE.POPULAR,page).then(data => {        
          this.popularMovies = this.popularMovies.concat(data['results'])
          this.popularTrack = data
          this.isPopularMovieLoading  = false 
      });
    }
  }

  loadTopRatedMovies() : void {
    var page = ''
    if (this.topRatedTrack['page'] < this.topRatedTrack['total_pages']) {
      page = this.topRatedTrack['page'] + 1 + ''
    }
    if (page !== '') {
      this.isTopRatedMovieLoading = true
      this.movieService.getMovies(MOVIE_TYPE.TOP_RATED,page).then(data => {        
          this.topRatedMovies = this.topRatedMovies.concat(data['results'])
          this.topRatedTrack = data  
          this.isTopRatedMovieLoading = false     
      });
    }    
  }

  loadComingMovies() : void {
    var page = ''
    if (this.upcomingTrack['page'] < this.upcomingTrack['total_pages']) {
      page = this.upcomingTrack['page'] + 1 + ''
    }
    if (page !== '') {
      this.isUpcomingdMovieLoading = true
      this.movieService.getMovies(MOVIE_TYPE.UP_COMING,page).then(data => {        
          this.upcomingdMovies = this.upcomingdMovies.concat(data['results'])
          this.upcomingTrack = data     
          this.isUpcomingdMovieLoading = false  
      });
    } 
  }

  getYear(date: string) : number {
    var mydate = new Date(date);
    return mydate.getFullYear();
  }

}
