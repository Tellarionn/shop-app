import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ProductsComponent } from './components/products/products.component';
import { MainPageComponent } from './main-page.component';
import { ProductDeteailsComponent } from './components/product-deteails/product-deteails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterProductsPipe } from 'src/app/shared/pipes/filter-products.pipe';
import { CartComponent } from './components/cart/cart.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    MainPageComponent,
    ProductDeteailsComponent,
    FilterProductsPipe,
    CartComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MainPageModule {}
