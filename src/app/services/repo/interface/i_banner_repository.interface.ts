import { Observable } from 'rxjs';
import { IBaseRepository } from './i_base_repository.interface';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export abstract class IBannerRepository<
  Banner
> extends IBaseRepository<Banner> {
  abstract getList(): Observable<Banner[]>;
}
