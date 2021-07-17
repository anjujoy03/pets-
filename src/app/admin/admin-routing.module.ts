import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { DoctorComponent } from './doctor/doctor.component';
import { PetsComponent } from './pets/pets.component';
import { HomeComponent} from './home/home.component'
import { TrainerComponent } from './trainer/trainer.component';
import { AddshopComponent } from './addshop/addshop.component';
import { OrderComponent } from './order/order.component'
import { ToyslistComponent } from './toyslist/toyslist.component';
import{RegisershopComponent} from './regisershop/regisershop.component';
import { Role } from '../_models/roles';
import { AuthenticationGuard } from '../authentication.guard';

const routes: Routes = [
  {
    path:'order',
    component:OrderComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  },
  {
    path:'pets',
    component:PetsComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  },
 
  {
    path:'doctor',
    component:DoctorComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  },
 
  {
    path:'trainer',
    component:TrainerComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  },
  {
    path:'addshop',
    component:AddshopComponent,
      canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  },
  {
    path:'toyslist',
    component:ToyslistComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  }
  ,
  {
    path:'toyslist/:id/:tepm_id',
    component:ToyslistComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  },
  {
    path:'registershop',
    component:RegisershopComponent,
    canActivate: [AuthenticationGuard], 
    data: { roles: [Role.admin]} 
  }
  ,
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
