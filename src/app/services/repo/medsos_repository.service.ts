import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseRepository } from './base_repository.service';
import { UrlConstans } from '../../constants/constants.service';
import { Injectable } from '@angular/core';
import { IMedsosRepository } from './interface/i_medsos_repository.interface';

@Injectable({ providedIn: 'root' })
export default class MedsosRepository<Medsos>
  extends BaseRepository<Medsos>
  implements IMedsosRepository<Medsos>
{
  private _medsos: BehaviorSubject<Medsos[]> = new BehaviorSubject<Medsos[]>(
    []
  );

  get medsos$(): Observable<Medsos[]> {
    return this._medsos.asObservable();
  }

  getList(): Observable<Medsos[]> {
    return this.getAll(`${UrlConstans.GET_MEDSOS_LIST}`).pipe(
      tap((res: Medsos[]) => {
        this._medsos.next(res);
      })
    );
  }
}
