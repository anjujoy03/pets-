import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { PetComponent } from './pet/pet.component';
import { ToyComponent } from './toy/toy.component';
import {FoodComponent} from './food/food.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import {ShophomeComponent} from './shophome/shophome.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AccordianComponent } from './accordian/accordian.component';
import { Role } from '../_models/roles';
import { AuthenticationGuard } from '../authentication.guard';

const routes: Routes = [
  {
    path:'food',
    component:FoodComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.shop]} 
  },
  {
    path:'pet',
    component:PetComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.shop]} 
  },
  {
    path:'toy',
    component:ToyComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.shop]} 
  },
  {
     path:'orderdetails',
     component:OrderdetailsComponent,
     canActivate: [AuthenticationGuard], 
     data: { roles: [Role.shop]} 
  },
  {
    path:'shophome',
    component:ShophomeComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.shop]} 
 }, {
  path:'delivery',
  component:DeliveryComponent,
  canActivate: [AuthenticationGuard], 
  data: { roles: [Role.shop]} 
} ,{
  path:'accordian',
  component:AccordianComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
