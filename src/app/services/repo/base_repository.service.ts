import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseRepository } from './interface/i_base_repository.interface';
import { AuthConstant, ConstantsHeaders } from '../../constants/constants.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected http: HttpClient;

  constructor(http: HttpClient, private _headers: ConstantsHeaders) {
    this.http = http;
  }

  getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url, { headers: this._headers.getHeaders() });
  }

  getById(url: string, id: number): Observable<T> {
    return this.http.get<T>(`${url}${id}`,{ headers: this._headers.getHeaders() });
  }

  add(url: string, item: T): Observable<T> {
    return this.http.post<T>(url, item, { headers: this._headers.getHeaders() });
  }

  update(url: string, item: T): Observable<T> {
    return this.http.put<T>(url, item, { headers: this._headers.getHeaders() });
  }

  delete(url: string, id: number): Observable<T> {
    return this.http.get<T>(`${url}${id}`, { headers: this._headers.getHeaders() });
  }
}
