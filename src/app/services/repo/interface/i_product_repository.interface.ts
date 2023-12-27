import { Observable } from 'rxjs';
import { IBaseRepository } from './i_base_repository.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export abstract class IProductRepository<T> extends IBaseRepository<T> {
  abstract getListProduct(): Observable<T[]>;
  abstract getProductById(id: number): Observable<T>;
}
