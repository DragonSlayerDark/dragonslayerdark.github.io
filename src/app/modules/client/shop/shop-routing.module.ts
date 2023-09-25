import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyOrdersListComponent } from './my-orders-list/my-orders-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopComponent } from './shop.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubProductListComponent } from './sub-product-list/sub-product-list.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'cart',
        component: MyOrderComponent
      },
      {
        path: 'orders',
        component: MyOrdersListComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'categories',
        component: CategoryListComponent
      },
      {
        path: 'sub-categories',
        component: SubCategoryListComponent
      },
      {
        path: 'sub-products',
        component: SubProductListComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: '**',
        redirectTo: 'products',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
