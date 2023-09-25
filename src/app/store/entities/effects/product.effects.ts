import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap, tap } from 'rxjs';
import * as fromProduct from '../actions/product.actions';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { EntityStrapi } from '../strapi_payload_entity';
import { AppService } from '../../custom/services/app.service';




@Injectable()
export class ProductEffects {


  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private appService: AppService
  ) { }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduct.loadProducts),
      switchMap(({ page }) => {
        return this.productService.getProducts(page).pipe(
          map((x) => {
            return fromProduct.loadProductsSuccess({ products: x.data as EntityStrapi<Product>[] });
          })
        )
      })
    )
  );

  loadProductsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduct.loadProductsSuccess),
      tap((action) => {
        // localStorage.removeItem('cart');
      })
    ), {
    dispatch: false
  });

  loadProductsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduct.loadProductsById),
      switchMap(({ pet_type_id }) => {
        return this.productService.getProductsBySubCategoryId( pet_type_id).pipe(
          map((x) => {
            return fromProduct.loadProductsByIdSuccess({ products: x.data as EntityStrapi<Product>[] });
          })
        )
      })
    )
  );

  loadProductsByPetTypeId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduct.loadProductsByPetTypeId),
      switchMap(({ pet_type_id, page }) => {
        return this.productService.getProductsByPetTypeId(pet_type_id, page).pipe(
          map((x) => {
            return fromProduct.loadProductsByIdSuccess({ products: x.data as EntityStrapi<Product>[] });
          }),tap(() => {
                this.appService.onActivate();
          })
        )
      })
    )
  );


  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduct.loadProduct),
      switchMap(({ id }) => {
        return this.productService.getProduct(id).pipe(
          map((x) => {
            return fromProduct.loadProductSuccess({ product: x.data as EntityStrapi<Product> });
          })
        )
      })
    )
  );

  loadVaccineProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProduct.loadVaccineProducts),
      switchMap(({ id1, id2 }) => {
        return this.productService.getVaccineProducts( id1, id2).pipe(
          map((x) => {
            return fromProduct.loadVaccineProductsSuccess({ products: x.data as EntityStrapi<Product>[] });
          }), tap(() => {
            this.appService.onActivate();
          })
        )
      })
    )
  );




}
