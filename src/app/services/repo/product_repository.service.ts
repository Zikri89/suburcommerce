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

  get products$(): Observable<Product[]> {
    return this._products.asObservable();
  }


  getList(): Observable<Product[]> {
    return this.getAll(`${UrlConstans.GET_PRODUCT_LIST}?pageNumber=1&pageSize=30`)
      .pipe(tap((res: Product[]) => {
        this._products.next(res)
    }));
  }

  getMap(id: number): Observable<Product> {
    throw new Error('Method not implemented.');
  }

}
