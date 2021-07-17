import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { PetsComponent } from './pets/pets.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { TrainerComponent } from './trainer/trainer.component';
import { OrderComponent } from './order/order.component';
import { ToyslistComponent } from './toyslist/toyslist.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService} from '../_services/auth-interceptor.service';
import {MatStepperModule} from '@angular/material/stepper';
import { RegisershopComponent } from './regisershop/regisershop.component';
import {PagerService}    from './../_services/pager.service';
import {DatePipe} from '@angular/common';
import { AdmiaccordianComponent } from './admiaccordian/admiaccordian.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list'


@NgModule({
  declarations: [PetsComponent, DoctorComponent, HomeComponent,TrainerComponent, OrderComponent, ToyslistComponent, RegisershopComponent, AdmiaccordianComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AdminRoutingModule,
 
    MatStepperModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    PagerService,
    DatePipe
],
})
export class AdminModule { }
