import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, of } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { environment } from 'src/environments/environment';
import { Order } from '../../entities/models/order.model';
import { Product } from '../../entities/models/product.model';
import { EntityStrapi, StrapiPayloadEntity } from '../../entities/strapi_payload_entity';
import { PaymentNetpay } from '../models/payment_netpay.model';
import { UserNetpayPayload } from '../models/user_netpay.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private apollo: Apollo
  ) { }

  createPayment(token: string, orderID: string, amount: number) {
    return this.http.post<{ data: PaymentNetpay, error: boolean }>(`${environment.payment}/createPayment`, {
      source: token,
      amount,
      description: "Test",
      billing: {
        adress: "Test", // TODO: verificar el nombre de la variable
        email: environment.production ? this.authService.getUser().email : "accept@netpay.com.mx",
        firstName: this.authService.getUser().firstName,
        lastName: this.authService.getUser().lastName,
        merchantReferenceCode: orderID,
        phone: "1234567890",
        address: {
          city: "JUAREZ",
          country: "MX",
          postalCode: "66269",
          state: "CHIHUAHUA",
          street1: "Humberto Junco Voigt, México 2307-2o Sector, Santa Engracia"
        }
      },
    });
  }

  confirmPayment(token: string) {
    return this.http.post<{ error: boolean; data: any; }>(`${environment.payment}/confirmPayment/${token}`, {});
  }

  getOrderInfo(token: string) {
    return this.http.post<{ error: boolean; data: any; }>(`${environment.payment}/transactions/${token}`, {});
  }

  createOrder(addressID: string | number) {
    let products: { product: EntityStrapi<Product>, quantity: number }[] = JSON.parse(localStorage.getItem('cart'));
    let cart = products.map(x => {
      return {
        product: x.product.id,
        quantity: x.quantity
      }
    });
    let pet = JSON.parse(localStorage.getItem('selectedPetID'));
    return this.http.post<StrapiPayloadEntity<Order>>(`${environment.server}/api/orders?populate=*`, {
      data: {
        user: this.authService.getId(),
        payment: null,
        orderDate: new Date(),
        subtotal: 0, // It will be calculated in the backend
        tax: 0, // It will be calculated in the backend
        // IDS of the products
        products: cart,
        deliveryAddress: addressID,
        pet,
      }
    });
  }

  updatePaymentResponse(orderID: string, paymentResponse: any) {
    // convert paymentResponse to a string with JSON.stringify, trying to escaping the double quotes
    let payment = JSON.stringify(paymentResponse).replace(/"/g, '\\"');

    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updateOrder(id: "${orderID}", data: { payment: "${payment}"}) {
            data {
              id
              attributes {
                createdAt
                subtotal
                products {
                  product {
                    data {
                      id
                      attributes {
                        name
                        subtotal
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
              }
            }
          }
        }
      `
    }).pipe(map((x) => {
      return x['data'];
      // return x['data'].updateOrder.data;
    }));
  }

  getNetpayClient() {
    return this.http.get<UserNetpayPayload>(`${environment.payment}/me`).pipe(
      map((x) => {
        return x['data'];
      })
    );
  }
}
