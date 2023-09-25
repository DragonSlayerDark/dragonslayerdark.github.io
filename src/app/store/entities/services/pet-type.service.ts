import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetTypeService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  getTypes() {
    return this.apollo.query({
      query: gql`
      query {
        petTypes {
          data{
            id,
            attributes {
              name
              icon{
                data{
                  id
                  attributes{
                    name
                    url
                  }
                }
              }
            }
          }
        }
      }`
    }).pipe(map(x => x.data['petTypes'].data));
  }
}
