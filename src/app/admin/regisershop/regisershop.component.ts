import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {GeneralserviceService} from '../../generalservice.service';
import {PagerService}    from './../../_services/index';
import {Location} from '@angular/common';
import { Config, HomeMenu } from 'src/app/types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-regisershop',
  templateUrl: './regisershop.component.html',
  styleUrls: ['./regisershop.component.css']
})
export class RegisershopComponent implements OnInit {
  TrainerDetils: any;
  Trainers: any=[];
  doctorDetils: any;
  States: any;
  District: any;
  shopList: any;
  shopDetails: any;
  isShown: boolean = false ;
  

 
  doctorForm!: FormGroup;
  myFiles:any=[];
  doctorList:any=[];
   pager: any = {};
   
  
  pagedItems: any=[];
  show:boolean=false;
  UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
  isfilter: boolean=false;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private router:Router) {
    
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
      active: false,
      url:'order'

    },
    { 
      name: 'Shop',
      iconClass: '../../../assets/img/shop.png',
      active: true,
      url:'registershop'

    },
    // { 
    //   name: 'Reports',
    //   iconClass: '../../../assets/img/categories.png',
    //   active: false,
    //   url:'home'

    // }
  ]


  filterdropdown(){
    this.isfilter=!this.isfilter;
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
  toggleShow() {

    this.isShown = ! this.isShown;
    
    }


    ngOnInit(): void {
      this.doctorForm = this.formBuilder.group({
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
  this.getshops()
  this.getStates()
  }

  getStates(){
    this.gen.getState().subscribe((resp:any) => {
     this.States=resp['state']
    });
    
  }
  getDistrict(event:any){
    this.gen.getDistrictbyid(event.target.value).subscribe((resp:any) => {
      this.District=resp['disrict']
     });
  }

    
  onSubmit() {
    


        
    console.log(this.doctorForm?.value)
          
        var formData = new FormData();
       
        for(let i=0;i<this.myFiles.length;i++){
          console.log(this.myFiles[i])
          formData.append('myfile',this.myFiles[i])
        }
        
      
           
           formData.append('shop_name',this.doctorForm.controls['shop_name'].value)
           formData.append('shop_address',this.doctorForm.controls['shop_address'].value)
           formData.append('shop_pincode',this.doctorForm.controls['shop_pincode'].value)
           formData.append('shop_place',this.doctorForm.controls['shop_place'].value)
           formData.append('shop_district',this.doctorForm.controls['shop_district'].value)
           formData.append('shop_state',this.doctorForm.controls['shop_state'].value)
           formData.append('shop_country',this.doctorForm.controls['shop_country'].value)
           formData.append('shop_desc',this.doctorForm.controls['shop_desc'].value)
           formData.append('user_id',this.doctorForm.controls['user_id'].value)
           formData.append('password',this.doctorForm.controls['password'].value)
           formData.append('phone_number',this.doctorForm.controls['phone_number'].value)
           formData.append('shop_id',this.doctorForm.controls['shop_id'].value)
        
          this.http.post(environment.apiUrl + '/apiregistershop',formData).subscribe((response:any) => {
          
            if(response['status'] =='SUCCESS'){
              this.getshops();
         
     
            }
          });
  }
    
  DeleteShop(shop_id:any){
    this.http.post(environment.apiUrl + '/apideleteshop',{shop_id:shop_id}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
         this.getshops();
     
      }})
  }
  viewDetails(_value:any,doc:any,type:any){
    if(type=='eye'){
      doc.expanded=!doc.expanded;
    }

    
    this.http.post(environment.apiUrl + '/apigetshopbyid',{shop_id:_value}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.shopDetails=response['shop_dtls'];
           this.gen.getDistrictbyid(this.shopDetails[0].shop_state).subscribe((resp:any) => {
      this.District=resp['disrict']
     });
        this.doctorForm.get('shop_name')?.setValue(this.shopDetails[0].shop_name)
        this.doctorForm.get('shop_address')?.setValue(this.shopDetails[0].shop_address)
        this.doctorForm.get('shop_pincode')?.setValue(this.shopDetails[0].shop_pincode)
        this.doctorForm.get('shop_place')?.setValue(this.shopDetails[0].shop_place)
        this.doctorForm.get('shop_district')?.setValue(this.shopDetails[0].shop_district)
        this.doctorForm.get('shop_state')?.setValue(this.shopDetails[0].shop_state)
        this.doctorForm.get('shop_country')?.setValue(this.shopDetails[0].shop_country)
        this.doctorForm.get('shop_desc')?.setValue(this.shopDetails[0].shop_desc)
        this.doctorForm.get('user_id')?.setValue(this.shopDetails[0].user_id)
        this.doctorForm.get('phone_number')?.setValue(this.shopDetails[0].contact_number)
        this.doctorForm.get('shop_id')?.setValue(this.shopDetails[0].shop_id)
    
     
      }
  
});

  }

  
  goBack() {
   
  }

    setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.shopList.length, page);
  
    // get current page of items
    this.pagedItems = this.shopList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

  onChange(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.myFiles.push(file)
    }
  
  }
  filter(place:any){
    this.isfilter=!this.isfilter;
    this.pagedItems= this.shopList.filter((obj:any)=>{
      console.log(obj)
      return obj.shop_district==place;

    })
    
  }
  getshops(){
    this.http.post(environment.apiUrl + '/apigetshoplist',{'id':'admin'}).subscribe((response:any) => {
      for(let x of response['shop_list'] ){
        x['expanded']=false
      }
      this.shopList=response['shop_list'];
      this.setPage(1)
   })

  }



}