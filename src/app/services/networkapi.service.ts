import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class NetworkApiService<T> {
  private apiUrl = 'https://dummyjson.com';
  constructor(private http: HttpClient) { }
  getDataList(url: {param : string}): Observable<T>{
    var response = this.http.get<T>(`${this.apiUrl}/${url.param}`);
    return response;
  }
}
