import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopComponent } from './shop.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MyOrdersListComponent } from './my-orders-list/my-orders-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubProductListComponent } from './sub-product-list/sub-product-list.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductListComponent,
    MyOrderComponent,
    MyOrdersListComponent,
    CategoryListComponent,
    SubCategoryListComponent,
    SubProductListComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
