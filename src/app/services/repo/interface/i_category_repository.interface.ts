import { Observable } from 'rxjs';
import { IBaseRepository } from './i_base_repository.interface';
import { Injectable } from '@angular/core';
import { Category } from '../../../models/category.interface';
@Injectable({ providedIn: 'root' })

export abstract class ICategoryRepository<Categories> extends IBaseRepository<Categories> {
  abstract getList(): Observable<Category[]>;
}
