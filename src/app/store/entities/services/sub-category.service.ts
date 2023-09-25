import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(
    private apollo: Apollo
  ) { }


  getSubCategories(id: string | number){
    return this.apollo.query({
      query: gql`query{
  subCategories(filters: { category: { id : {contains: "${id}"}}}){
    data{
      id
      attributes{
        name
        category{
          data{
            id
          }
        }
      }
    }
  }
}`
    }).pipe(map( x => x.data['subCategories']));
  }
}
