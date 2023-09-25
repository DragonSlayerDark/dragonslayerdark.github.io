import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommercialPayload } from '../models/commercial.model';

@Injectable({
  providedIn: 'root'
})
export class CommercialService {

  constructor(
    private http: HttpClient
  ) { }

    getCommercials(){
      return this.http.get<CommercialPayload>(`${environment.server}/api/commercials?populate=*`);
    }

}
