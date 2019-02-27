import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url : string = 'https://api.themoviedb.org/4/list/' 
  headers : HttpHeaders = new HttpHeaders()
  
  constructor(private http : HttpClient) { 
    this.headers =  this.headers.append('Accept', 'application/json');   
  }

  getMovies (type : string, page: string = '1') {
    let promise = new Promise((resolve, reject) => {     

      let params = new HttpParams();
      params = params.set('page', page)
      params = params.set('api_key', environment.token)
      this.http.get(this.url + type, {headers : this.headers, params : params}).subscribe(resp  => {
        var data = {}
        data['total_pages'] = resp['total_pages']
        data['page'] = resp['page']
        data['total_results'] = resp['total_results']
        data['results'] = resp['results']
        
        resolve(data)
      },
      msg => {
        console.error(msg.message);
        resolve(msg)
      });
    });
    
    return promise;
  }
}
