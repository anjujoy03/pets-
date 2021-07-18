import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { environment } from 'src/environments/environment';
import { PagerService } from 'src/app/_services';
import { DatePipe } from '@angular/common';
import { Config, Menu } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  orderList: any;
  pager: any = {};
   
  
  pagedItems: any=[];
  orderDetails: any;
  total_amount:number=0;
  orderLists:any=[];
  OrderStatus:any;
  show=false;
  UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
  isShown: boolean = false ; 
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private pipe:DatePipe,private router:Router) {}

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
      active: false,
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
      active: true,
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
    this.getorders();
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
    this.pager = this.page.getPager(this.orderList.length, page);
  
    // get current page of items
    this.pagedItems = this.orderList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }
  // localStorage.getItem('user_id')
  getorders(){
    this.http.post(environment.apiUrl + '/apigetordersforshop',{user_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){
        this.orderList=response['orders'];
        console.log(this.orderList);
        this.setPage(1)
      }
     
   })

  }
  getorderDetails(order_id:any){
    this.http.post(environment.apiUrl + '/apiordersdetsils',{order_id:order_id}).subscribe((response:any) => {
      if(response.response=='Success'){
        this.orderDetails=response['order_details'];
        this.total_amount=parseInt(this.orderDetails[0]?.order_amount)+60;
        this.OrderStatus=this.orderDetails[0]?.order_status;
        this.orderLists=response['order_list'];
        console.log(this.orderList)
     
      }
     
   })

  }
  OnOrderChnage(value:any){
this.OrderStatus=value.target.value;
  }
  updateOrderstatus(order_id:any){
    this.http.post(environment.apiUrl + '/apiupdate_order',{order_id:order_id,status: this.OrderStatus,user_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){
 this.getorders();
      }
     
   })

  }
}
