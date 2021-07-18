import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {GeneralserviceService} from '../../generalservice.service';
import {PagerService}    from './../../_services/index';
import {Location} from '@angular/common';
import { Config, Menu } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  UserList:any=[];
    pager: any = {};
  pagedItems: any=[];
  show: boolean=false;
  UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
  isShown: boolean = false ; 

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private loc:Location,private router:Router
  ) {}


  options: Config = { multi: false };
  menus: Menu[] = [
    {
      name: 'Dashboard',
      iconClass: '../../../assets/img/dashboard.png',
      active: false,
      submenu: [
        { name: 'Home', url: 'shop/shophome' ,icon:''},
      
  
      ]
    },
    { 
      name: 'Products',
      iconClass: '../../../assets/img/product.png',
      active: false,
      submenu: [
        { name: 'Manage Products', url: 'shop/pet' ,icon:''},

       

      ]
    },    { 
      name: 'Settings',
      iconClass: '../../../assets/img/settings.png',
      active: true,
      submenu: [
        { name: 'Users', url: 'shop/food' ,icon:''},
        { name: 'Delivery Settings', url: 'shop/delivery' ,icon:''},
        { name: 'Profile', url: 'shop/toy' ,icon:''},
        // { name: 'Category', url: 'pets' ,icon:''},

       

      ]
    },
    { 
      name: 'Orders',
      iconClass: '../../../assets/img/orders.png',
      active: false,
      submenu: [
        { name: 'Order detail', url: 'shop/orderdetails' ,icon:''},
       
      ]
    },
    // { 
    //   name: 'Reports',
    //   iconClass: '../../../assets/img/categories.png',
    //   active: false,
    //   submenu: [
    //     { name: 'Sales Report', url: 'shop/shophome' ,icon:''},

    //   ]
    // },

   
  ];
  Logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  accountdropdown(){
    this.logactive=!this.logactive;
  }
  ngOnInit(): void {
    this.getUsers();
  }
  
  toggle(){
    this.show=!this.show;
    console.log(this.show)
  }
  toggleShow() {

    this.isShown = ! this.isShown;
    
    }
  setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.UserList.length, page);
  
    // get current page of items
    this.pagedItems = this.UserList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }
  getUsers(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });
   

      this.http.post(environment.apiUrl + '/apireg_usersforshop',{shop_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
        if(response['status'] =='SUCCESS'){
          this.UserList=response['user_list']
    
          this.setPage(1);
        }
     
        
    })

  }

}
