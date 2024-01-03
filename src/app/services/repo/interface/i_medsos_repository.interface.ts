import { Observable } from 'rxjs';
import { IBaseRepository } from './i_base_repository.interface';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export abstract class IMedsosRepository<
  Medsos
> extends IBaseRepository<Medsos> {
  abstract getList(): Observable<Medsos[]>;
}
