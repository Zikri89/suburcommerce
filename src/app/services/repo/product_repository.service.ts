import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, concatMap, forkJoin, map, scan, tap } from 'rxjs';
import { IProductRepository } from './interface/i_product_repository.interface';
import { BaseRepository } from './base_repository.service';
import { AuthConstant, ConstantsHeaders, UrlConstans } from '../../constants/constants.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })

export class ProductRepository<Product> extends BaseRepository<Product> implements IProductRepository<Product> {

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _productCounts: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  get products$(): Observable<Product[]> {
    return this._products.asObservable();
  }

  get productCounts$(): Observable<Product[]> {
    return this._productCounts.asObservable();
  }


  getList(pageNumber: number, pageSize: number): Observable<Product[]> {
    return this.getAll(`${UrlConstans.GET_PRODUCT_LIST}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(
      map((products: Product[]) => {
        const currentProducts = this._products.value;
        this._products.next([...currentProducts, ...products]);
        return products;
      })
    );
  }


  getMap(id: number): Observable<Product> {
    throw new Error('Method not implemented.');
  }

  getTotalProduct(): Observable<any> {
    return this.http.get(`${UrlConstans.GET_PRODUCT_COUNT}`, { headers: this.headers.getHeaders() }).pipe(tap((res: any) => {
      this._productCounts.next(res)
    }));
  }

}
