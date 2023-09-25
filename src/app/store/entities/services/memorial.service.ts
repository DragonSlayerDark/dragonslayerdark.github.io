import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemorialPayload } from '../models/memorial.model';

@Injectable({
  providedIn: 'root'
})
export class MemorialService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  getMemorials(){
    // return this.http.get<MemorialPayload>(`${environment.server}/api/memorials?populate=*`);
    return this.apollo.query({
      query:gql`
      query{
  memorials{
    data{
      attributes{
        name
        media{
          data{
            attributes{
              url
            }
          }
        }
      }
    }
  }
}
      `
    }).pipe(map(x => x.data['memorials']));
  }
}
