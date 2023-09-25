import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentNetpay } from '../../custom/models/payment_netpay.model';
import { ProductPayload } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(page: number) {
    return this.http.get<ProductPayload>(`${environment.server}/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=5`);
  }

  getProductsBySubCategoryId(pet_type_id: string | number ) {
    return this.http.get<ProductPayload>(`${environment.server}/api/products?populate=*&[filters][sub_category][id][]$eq]=${pet_type_id}`);
  }

  getProductsByPetTypeId(pet_type_id: string | number, page: number) {
    return this.http.get<ProductPayload>(`${environment.server}/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=10&[filters][pet_type][id][]$eq]=${pet_type_id}`);
  }

  getProduct( id: string | number) {
    return this.http.get<ProductPayload>(`${environment.server}/api/products/${id}?populate=*`);
  }

  getVaccineProducts(id1: string | number, id2:string|number) {
    return this.http.get<ProductPayload>(`${environment.server}/api/products?populate=*&[filters][sub_category][id][$in[]]=${id1}&[filters][sub_category][id][$in[]]=${id2}`);
  }
}
