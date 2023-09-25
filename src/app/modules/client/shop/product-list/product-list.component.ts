import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadSavedCart, addProductToCart } from 'src/app/store/custom/actions/cart.actions';
import { loadPetTypes } from 'src/app/store/entities/actions/pet-type.actions';
import { loadProducts, loadProductsById, loadProductsByPetTypeId, loadProductsByPetTypeIdSuccess } from 'src/app/store/entities/actions/product.actions';
import { PetType } from 'src/app/store/entities/models/pet-type.model';
import { Product } from 'src/app/store/entities/models/product.model';
import { selectAllPetTypes } from 'src/app/store/entities/selectors/pet-type.selectors';
import { selectAllProducts } from 'src/app/store/entities/selectors/product.selectors';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { AppService } from '../../../../store/custom/services/app.service';
import { PAWLLocalStorage } from 'src/app/exports/enums';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  petTypes$: Observable<EntityStrapi<PetType>[]>;
  products: Observable<EntityStrapi<Product>[]>;
  pageNumber = 1;
  selectedPetTypeID = (JSON.parse(localStorage.getItem(PAWLLocalStorage.SELECTED_PET)))?.petTypeId;
  selectedPetId = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private App: AppService
  ) {
    this.products = this.store.pipe(select(selectAllProducts));
    this.petTypes$ = this.store.pipe(select(selectAllPetTypes));
  }

  ngOnInit(): void {
    this.App.onActivate();
    this.store.dispatch(loadPetTypes());
    if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET) === null) {
      return this.store.dispatch(loadProducts({ page: 1 }));
    } else if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET) != null){
      return this.store.dispatch(loadProductsByPetTypeId({ pet_type_id: this.selectedPetTypeID, page: this.pageNumber }));
    }
  }

  addToCart(product: EntityStrapi<Product>) {
    this.store.dispatch(addProductToCart({ product }));
  }

  previousPage() {
    if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET) === null) {
      return this.store.dispatch(loadProducts({ page: --this.pageNumber }));
    } else if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET) != null) {
      return this.store.dispatch(loadProductsByPetTypeId({ pet_type_id: this.selectedPetTypeID, page: --this.pageNumber }));
    }
  }

  nextPage () {
    if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET) === null){
      return this.store.dispatch(loadProducts({ page: ++this.pageNumber }));
    } else if (localStorage.getItem(PAWLLocalStorage.SELECTED_PET) != null) {
      return this.store.dispatch(loadProductsByPetTypeId({ pet_type_id: this.selectedPetTypeID, page: ++this.pageNumber }));
    }
  }


  selectPetType(id: number, name: string ) {
    localStorage.setItem('selectedPetTypeID', id + "");
    localStorage.setItem('selectedPetTypeName', name);
    this.router.navigate(['/shop', 'categories']);
  }

  selectProduct(id: number) {
    localStorage.setItem('selectedProductID', id + "");
    this.router.navigate(['/shop', 'product'])
  }

}
