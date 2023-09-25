import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Apollo, gql} from 'apollo-angular'
import { map } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

    getCategories( id:string | number){
      return this.apollo.query({
        query: gql`query{
  categories(filters: { pet_type: { id :{contains: "${id}"}
    }}){
    data{
      id
      attributes{
        name
        pet_type{
          data{
            id
          }
        }
      }
    }
  }
}`
      }).pipe(map(x => x.data['categories']));
    }



}
