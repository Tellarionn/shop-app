import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDeteailsComponent } from './components/product-deteails/product-deteails.component';
import { ProductsComponent } from './components/products/products.component';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'products/product/:id', component: ProductDeteailsComponent },
      { path: 'products/product', redirectTo: 'products', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
