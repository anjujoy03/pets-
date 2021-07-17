import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { FoodComponent } from './food/food.component';
import { PetComponent } from './pet/pet.component';
import { ToyComponent } from './toy/toy.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptorService } from '../_services/auth-interceptor.service';
import { ShophomeComponent } from './shophome/shophome.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AccordianComponent } from './accordian/accordian.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list'


@NgModule({
  declarations: [FoodComponent, PetComponent, ToyComponent, OrderdetailsComponent, ShophomeComponent, DeliveryComponent, AccordianComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
],
})
export class ShopModule { }
