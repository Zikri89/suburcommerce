import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IProductRepository } from './interface/i_product_repository.interface';
import { BaseRepository } from './base_repository.service';
import { AuthConstant, ConstantsHeaders, UrlConstans } from '../../constants/constants.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })

export class ProductRepository<Product> extends BaseRepository<Product> implements IProductRepository<Product> {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  constructor(http: HttpClient, private _headers: ConstantsHeaders) {
    super(http)
  }

  get products$(): Observable<Product[]> {
    return this._products.asObservable();
  }

  getListProduct(): Observable<Product[]> {

    return this.http.get<Product[]>(`${UrlConstans.GET_PRODUCT_LIST}?pageNumber=1&pageSize=5`, { headers: this._headers.getHeaders() })
      .pipe(tap((res: Product[]) => {
        this._products.next(res)
    }));
  }

  getProductById(id: number): Observable<Product> {
    throw new Error('Method not implemented.');
  }

}
