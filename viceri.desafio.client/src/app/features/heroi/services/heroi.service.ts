import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../env/env';
import { IHeroi } from '../models/heroi.model';
import { Observable } from 'rxjs';
import { IPoderes } from '../models/poderes.model';
import { IReturnResponse } from '../../../core/models/return-response.model';

@Injectable({
  providedIn: 'root',
})
export class HeroiService {
  constructor(private http: HttpClient) {}

  getAllHerois() : Observable<IReturnResponse<IHeroi[]>> {
    return this.http.get<IReturnResponse<IHeroi[]>>(`${apiUrl}/Heroi/GetAllHerois`);
  }

  getAllPoderes() : Observable<IReturnResponse<IPoderes[]>> {
    return this.http.get<IReturnResponse<IPoderes[]>>(`${apiUrl}/Heroi/GetAllPoderes`);
  } 

  getHeroiById(id: number) : Observable<IReturnResponse<IHeroi>> {
    return this.http.get<IReturnResponse<IHeroi>>(`${apiUrl}/Heroi/GetHeroiById/${id}`);
  }

  createHeroi(heroi: IHeroi) : Observable<IReturnResponse<void>> {
    return this.http.post<IReturnResponse<void>>(`${apiUrl}/Heroi/CreateHeroi`, heroi);
  }

  updateHeroi(heroi: IHeroi) : Observable<IReturnResponse<void>> {
    return this.http.put<IReturnResponse<void>>(`${apiUrl}/Heroi/UpdateHeroi/${heroi.id}`, heroi);
  }

  deleteHeroi(id: number) : Observable<IReturnResponse<void>> {
    return this.http.delete<IReturnResponse<void>>(`${apiUrl}/Heroi/DeleteHeroi/${id}`);
  }
}
