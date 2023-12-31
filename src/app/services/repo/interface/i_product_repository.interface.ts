import { Observable } from 'rxjs';
import { IBaseRepository } from './i_base_repository.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export abstract class IProductRepository<Product> extends IBaseRepository<Product> {
  abstract getList(pageSize: number, pageNumber: number): Observable<Product[]>;
  abstract getMap(id: number): Observable<Product>;
  abstract getTotalProduct(): Observable<any>;
}
