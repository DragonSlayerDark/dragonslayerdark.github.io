import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { StrapiPayloadEntity } from 'src/app/store/entities/strapi_payload_entity';
import { User } from 'src/app/auth_services/model/user.model';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanelService {

  constructor(
    private http: HttpClient,
    private apollo: Apollo
  ) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.server}/api/users?populate=*`);
  }

  getOrders(userID: number, pending: boolean = false) {
    //! TODO: Cambiar consulta GraphQL por variables en el query
    return this.apollo.query({
      query: gql`
      query {
        orders ${ userID != null ? `(filters: {
                    user : {
                      id : {
                        eq: ${userID }
                        }
                      }
                      ${pending ? ', paid: { eq: false }' : ''}
                    })` : '' } {
          data {
            id
            attributes {
              createdAt
              subtotal
              tax
              paid
              orderDate
              products {
                quantity
                product {
                  data {
                    id
                    attributes {
                      name
                      subtotal
                      stripe_id
                    }
                  }
                }
              }
              user {
                data {
                  attributes {
                    email
                  }
                }
              }
              pet{
                data {
                  id
                  attributes{
                    name
                    memorial
                    photo{
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
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }`
    }).pipe(map(x => x.data['orders']));
  }
}
