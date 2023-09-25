import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { Address } from '../../entities/models/address.model';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  MODIFY_ADDRESSES = gql`
  mutation ($id: ID!, $addresses: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser (id: $id, data: $addresses) {
      data {
        attributes {
          address {
            id
            street
            city
            state
            zip
            country
            name
          }
        }
      }
    }
  }`;

  constructor(
    private apollo: Apollo,
    private auth: AuthService
  ) { }

  getAddresses(userID: string | number) {
    console.log("GET ADDRESSES OTRA VEZ")
    return this.apollo.query({
      query: gql`
        query {
          usersPermissionsUser (id: ${userID}) {
            data {
              id
              attributes {
                address {
                  id
                  street
                  city
                  state
                  zip
                  country
                  name
                }
              }
            }
          }
        }
      `}).pipe(map(x => {
        let response: Address[] = JSON.parse(JSON.stringify(x.data['usersPermissionsUser'].data.attributes.address));
        response.map(y => {
          delete y['__typename'];
          return y;
        });
        console.log("RESPONSE", response);
        return response;
      }));
  }

  deleteAddress(id: string | number, currentAddress: Address[]) {
    let newAddress = currentAddress.filter(x => x.id !== id);
    console.log(newAddress);
    return this.apollo.mutate({
      mutation: this.MODIFY_ADDRESSES,
      variables: {
        addresses: { address: newAddress },
        id: this.auth.getId()
      }
    }).pipe(map((x: any) => {
      let response = x.data['updateUsersPermissionsUser'].data.attributes.address;
      delete response.__typename;
      return response;
    }));
  }

  addAddress(city: string, country: string, state: string, street: string, zip: string, name: string, currentAddress: any[]) {
    currentAddress.push({
      city: city,
      country: country,
      state: state,
      street: street,
      zip: zip,
      name: name
    });

    return this.apollo.mutate({
      mutation: this.MODIFY_ADDRESSES,
      variables: {
        addresses: { address: currentAddress },
        id: this.auth.getId()
      }
    }).pipe(map((x: any) => {
      let response = x.data['updateUsersPermissionsUser'].data.attributes.address;
      delete response.__typename;
      console.log(response);
      // return the new address
      return response[response.length - 1];
    }));
  }


  updateAddress(id: string, city: string, country: string, state: string, street: string, zip: string, name:string, currentAddress: any[]){
    let newAddress = currentAddress.filter(x => x.id !== id)
    newAddress.push({
      city: city,
      country: country,
      state: state,
      street: street,
      zip: zip,
      name: name
    });

    return this.apollo.mutate({
      mutation: this.MODIFY_ADDRESSES,
      variables: {
        addresses: { address: newAddress },
        id: this.auth.getId()
      }
    }).pipe(map((x: any) => {
      let response = x.data['updateUsersPermissionsUser'].data.attributes.address;
      delete response.__typename;
      console.log(response);
      // return the new address
      return response[response.length - 1];
    }));
  }
}
