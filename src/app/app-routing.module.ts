import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import {HeadComponent} from './head/head.component';
// import {AdminModule} from './admin/admin.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'admin',
    loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'head',
    component:HeadComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full',
  

  },
  {
    path:'shop',
    loadChildren:() => import('./shop/shop.module').then(m => m.ShopModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
