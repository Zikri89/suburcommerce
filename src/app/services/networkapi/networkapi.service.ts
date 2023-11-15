import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, timeout } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})

export class NetworkApiService<T> {
  private apiUrl : string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getData(url: {param : string}): Observable<T>{
    var response = this.http.get<T>(`${this.apiUrl}${url.param}`).pipe(retry(1), timeout(30000));
    return response;
  }
}
