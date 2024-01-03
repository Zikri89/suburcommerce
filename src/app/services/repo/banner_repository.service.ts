import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseRepository } from './base_repository.service';
import { UrlConstans } from '../../constants/constants.service';
import { Injectable } from '@angular/core';
import { IBannerRepository } from './interface/i_banner_repository.interface';

@Injectable({ providedIn: 'root' })
export default class BannerRepository<Banner>
  extends BaseRepository<Banner>
  implements IBannerRepository<Banner>
{
  private _banners: BehaviorSubject<Banner[]> = new BehaviorSubject<Banner[]>(
    []
  );

  get banners$(): Observable<Banner[]> {
    return this._banners.asObservable();
  }

  getList(): Observable<Banner[]> {
    return this.getAll(`${UrlConstans.GET_BANNER_LIST}`).pipe(
      tap((res: Banner[]) => {
        this._banners.next(res);
      })
    );
  }
}
