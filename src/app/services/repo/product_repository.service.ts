import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IProductRepository } from './interface/i_product_repository.interface';
import { BaseRepository } from './base_repository.service';
import { UrlConstans } from '../../constants/constants.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductRepository<Product>
  extends BaseRepository<Product>
  implements IProductRepository<Product>
{
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  private _productCounts: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  get products$(): Observable<Product[]> {
    return this._products.asObservable();
  }

  get productCounts$(): Observable<any> {
    return this._productCounts.asObservable();
  }

  getList(pageNumber: number, pageSize: number): Observable<Product[]> {
    return this.getAll(
      `${UrlConstans.GET_PRODUCT_LIST}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ).pipe(
      tap((products: Product[]) => {
        this._products.next(products);
      })
    );
  }

  getMap(id: number): Observable<Product> {
    throw new Error('Method not implemented.');
  }

  getTotalProduct(): Observable<any> {
    return this.http
    .get(`${UrlConstans.GET_PRODUCT_COUNT}`, {
      headers: this.headers.getHeaders(),
    })
    .pipe(
      tap((res: any) => {
        this._productCounts.next(res);
      })
    );
  }
}
