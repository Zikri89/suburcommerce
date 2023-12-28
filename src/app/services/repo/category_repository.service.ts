import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseRepository } from './base_repository.service';
import { UrlConstans } from '../../constants/constants.service';
import { Injectable } from '@angular/core';
import { ICategoryRepository } from './interface/i_category_repository.interface';
import { Category } from '../../models/category.interface';

@Injectable({ providedIn: 'root' })

export default class CategoryRepository<Categories> extends BaseRepository<Category> implements ICategoryRepository<Category> {
  private _categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  get categories$(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  getList(): Observable<Category[]> {
    return this.getAll(`${UrlConstans.GET_CATEGORY_LIST}`)
      .pipe(tap((res: Category[]) => {
        this._categories.next(res)
      }),
    );
  }
}
