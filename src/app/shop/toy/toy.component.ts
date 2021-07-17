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
  selector: 'app-toy',
  templateUrl: './toy.component.html',
  styleUrls: ['./toy.component.css']
})
export class ToyComponent implements OnInit {

prodList: any=[];
  myFiles:any=[];
 ShopForm!: FormGroup;
 shopDetails:any=[];
 show=false;
 UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
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
      this.ShopForm = this.formBuilder.group({
        shop_name: [""],
        shop_address: [""],
        shop_pincode:[""],
        shop_place: [""],
        shop_district: [""],
        shop_state:[''],
        shop_country :[''],
        shop_desc: [''],
        user_id:[''],
        password:[''],
        phone_number:[''],
        shop_id:[''],
        image:['']
  

       });
  
    this.getshopprofile();
  
 }
    onChange(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.myFiles.push(file)
    }
  
  }
  viewDetails(){
    
     this.http.post(environment.apiUrl + '/apigetshopbyid',{shop_id:this.prodList && this.prodList[0]?.shop_id}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.shopDetails=response['shop_dtls'];
        this.ShopForm.get('shop_name')?.setValue(this.shopDetails[0].shop_name)
        this.ShopForm.get('shop_address')?.setValue(this.shopDetails[0].shop_address)
        this.ShopForm.get('shop_pincode')?.setValue(this.shopDetails[0].shop_pincode)
        this.ShopForm.get('shop_place')?.setValue(this.shopDetails[0].shop_place)
        this.ShopForm.get('shop_district')?.setValue(this.shopDetails[0].shop_district)
        this.ShopForm.get('shop_state')?.setValue(this.shopDetails[0].shop_state)
        this.ShopForm.get('shop_country')?.setValue(this.shopDetails[0].shop_country)
        this.ShopForm.get('shop_desc')?.setValue(this.shopDetails[0].shop_desc)
        this.ShopForm.get('user_id')?.setValue(this.shopDetails[0].user_id)
        this.ShopForm.get('phone_number')?.setValue(this.shopDetails[0].contact_number)
        this.ShopForm.get('shop_id')?.setValue(this.shopDetails[0].shop_id)
       
     }


      
  
});
  }
  
  onSubmit() {
  
        var formData = new FormData();
       
        for(let i=0;i<this.myFiles.length;i++){
          console.log(this.myFiles[i])
          formData.append('myfile',this.myFiles[i])
        }

           formData.append('shop_name',this.ShopForm.controls['shop_name'].value)
           formData.append('shop_address',this.ShopForm.controls['shop_address'].value)
           formData.append('shop_pincode',this.ShopForm.controls['shop_pincode'].value)
           formData.append('shop_place',this.ShopForm.controls['shop_place'].value)
           formData.append('shop_district',this.ShopForm.controls['shop_district'].value)
           formData.append('shop_state',this.ShopForm.controls['shop_state'].value)
           formData.append('shop_country',this.ShopForm.controls['shop_country'].value)
           formData.append('shop_desc',this.ShopForm.controls['shop_desc'].value)
           formData.append('user_id',this.ShopForm.controls['user_id'].value)
           formData.append('password',this.ShopForm.controls['password'].value)
           formData.append('phone_number',this.ShopForm.controls['phone_number'].value)
           formData.append('shop_id',this.ShopForm.controls['shop_id'].value)
        
          this.http.post(environment.apiUrl + '/apiregistershop',formData).subscribe((response:any) => {
          
            if(response['status'] =='SUCCESS'){
             
         
     
            }
          });
  }
  toggle(){
    this.show=!this.show;
    console.log(this.show)
  }

  // localStorage.getItem('user_id')
  getshopprofile(){
    this.http.post(environment.apiUrl + '/apiget_shopprofile',{user_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){
        this.prodList=response['shop_list'];

      }
     
   })

  }
}
