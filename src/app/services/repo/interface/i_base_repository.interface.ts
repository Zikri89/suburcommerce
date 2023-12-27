import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export abstract class IBaseRepository<T> {
  abstract getAll(url: string): Observable<T[]>;
  abstract getById(url: string, id: number): Observable<T>;
  abstract add(url: string, item: T): Observable<T>;
  abstract update(url: string, item: T): Observable<T>;
  abstract delete(url: string, id: number): Observable<T>;
}
