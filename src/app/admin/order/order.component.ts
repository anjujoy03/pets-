import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { environment } from 'src/environments/environment';
import { PagerService } from 'src/app/_services';
import { DatePipe } from '@angular/common';
import { Config, HomeMenu } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList: any;
  pager: any = {};
  total_amount:number=0;
   
  
  pagedItems: any=[];
  orderDetails: any;
  orderLists: any;


  
  show:boolean=false;
  UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
  isfilter: boolean=false;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private pipe:DatePipe,private router:Router) {
    
  }

  filterdropdown(){
    this.isfilter=!this.isfilter;
  } 
  options: Config = { multi: false };
  menus: HomeMenu[] = [
    {
      name: 'Dashboard',
      iconClass: '../../../assets/img/dashboard.png',
      active: false,
      url:'home'
      
    },
    {
      name: 'Pets',
      iconClass: '../../../assets/img/pets.png',
      active: false,
      url:'pets'
      
    },
    {
      name: 'Doctors',
      iconClass: '../../../assets/img/doc.png',
      active: false,
      url:'doctor'
      
    },
    {
      name: 'Trainers',
      iconClass: '../../../assets/img/trainers.png',
      active: false,
      url:'trainer'
      
    },
    { 
      name: 'Orders',
      iconClass: '../../../assets/img/orders.png',
      active: true,
      url:'order',
      

    },
    { 
      name: 'Shop',
      iconClass: '../../../assets/img/shop.png',
      active: false,
      url:'registershop'

    },
    // { 
    //   name: 'Reports',
    //   iconClass: '../../../assets/img/categories.png',
    //   active: false,
    //   url:'home'

    // }
  ]

  
  filter(place:any,items:any){
    this.isfilter=!this.isfilter;
    return items.sort((a:any,b:any)=>new Date(b.order_time).getTime()-new Date(a.order_time).getTime())
    // this.pagedItems= this.doctorList.filter((obj:any)=>{
    //   console.log(obj)
    //   return obj.place==place;

    // })
    // console.log( this.pagedItems)
  }


  Logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  accountdropdown(){
    this.logactive=!this.logactive;
  }
  
  toggle(){
    this.show=!this.show;
    console.log(this.show)
  }

  ngOnInit(): void {
    this.getorders();
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
    this.http.post(environment.apiUrl + '/apigetordersforadmin',{user_id:'Myp000281'}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){
        this.orderList=response['orders'];
        this.setPage(1)
      }
     
   })

  }
  getorderDetails(order_id:any){
    this.http.post(environment.apiUrl + '/apiordersdetsils',{order_id:order_id}).subscribe((response:any) => {
      if(response.response=='Success'){
        this.orderDetails=response['order_details'];
        this.total_amount=parseInt(this.orderDetails[0]?.order_amount)+60;
        this.orderLists=response['order_list'];
        console.log(this.orderList)
     
      }
     
   })

  }
  updateOrderstatus(){
    this.http.post(environment.apiUrl + '/apiupdate_order',{status:'Myp000281'}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){

      }
     
   })

  }
}

