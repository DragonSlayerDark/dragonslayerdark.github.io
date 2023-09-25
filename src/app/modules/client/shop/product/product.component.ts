import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { AppState } from 'src/app/store/app.state';
import { addProductsToCart, addProductToCart } from 'src/app/store/custom/actions/cart.actions';
import { loadProduct } from 'src/app/store/entities/actions/product.actions';
import { Product } from 'src/app/store/entities/models/product.model';
import { selectAllProducts, selectProductById } from 'src/app/store/entities/selectors/product.selectors';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: Observable<EntityStrapi<Product>>;
  quantity = 0;
  selectedProductID = localStorage.getItem(PAWLLocalStorage.SELECTED_PRODUCT_ID)
  selectedPetTypeName = localStorage.getItem('selectedPetTypeName');
  selectedCategoryName = localStorage.getItem('selectedCategoryName');
  selectedSubCategoryName = localStorage.getItem('selectedSubCategoryName');


  constructor(
    private store:Store<AppState>,
    private App: AppService
  ) {
    this.product$ = this.store.pipe(select(selectProductById( this.selectedProductID)))
  }

  ngOnInit(): void {
    this.store.dispatch(loadProduct({ id: this.selectedProductID }));
    this.App.onActivate();
  }


  counter(counter: string) {
    // (counter === 'add') ? this.quantity++ : this.quantity-- ;
    if(counter === 'add'){
      this.quantity++
    } else if (counter === 'subtract' && this.quantity > 0){
      this.quantity--
    }

  }


  addToCart(product: EntityStrapi<Product>) {
    if (this.quantity != 0){
      this.store.dispatch(addProductsToCart({ product, quantity: this.quantity }));
      this.quantity = 0
    }else if( this.quantity === 0){
      this.store.dispatch(addProductsToCart({ product, quantity: 1}));
    }
  }
}
