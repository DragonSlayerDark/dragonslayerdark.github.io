import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { AppState } from 'src/app/store/app.state';
import { loadProductsById } from 'src/app/store/entities/actions/product.actions';
import { Product } from 'src/app/store/entities/models/product.model';
import { selectAllProducts } from 'src/app/store/entities/selectors/product.selectors';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { loadSavedCart, addProductToCart } from 'src/app/store/custom/actions/cart.actions';
import { AppService } from '../../../../store/custom/services/app.service';


@Component({
  selector: 'app-sub-product-list',
  templateUrl: './sub-product-list.component.html',
  styleUrls: ['./sub-product-list.component.scss']
})
export class SubProductListComponent implements OnInit {

  products$: Observable<EntityStrapi<Product>[]>;
  selectedPetTypeName = localStorage.getItem('selectedPetTypeName');
  selectedCategoryName = localStorage.getItem('selectedCategoryName');
  selectedSubCategoryName = localStorage.getItem('selectedSubCategoryName');



  constructor(
    private store: Store<AppState>,
    private router: Router,
    private App: AppService
  ) {
    this.products$ = this.store.pipe(select(selectAllProducts));
   }

  ngOnInit(): void {
    this.App.onActivate();
    let selectedSubCategoryID = localStorage.getItem(PAWLLocalStorage.SELECTED_SUBCATEGORY_ID);
    this.store.dispatch(loadProductsById({ pet_type_id: selectedSubCategoryID}))
  }

  selectProduct(id:number) {
    localStorage.setItem('selectedProductID', id+"");
    this.router.navigate(['/shop', 'product'])
  }

  addToCart(product: EntityStrapi<Product>) {
    this.store.dispatch(addProductToCart({ product }));
  }

}
