import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { environment } from 'src/environments/environment';

import { ActivatedRoute, Router } from '@angular/router';
import {PagerService}    from './../../_services/index';
import { Config, HomeMenu } from 'src/app/types';
@Component({
  selector: 'app-toyslist',
  templateUrl: './toyslist.component.html',
  styleUrls: ['./toyslist.component.css']
})
export class ToyslistComponent implements OnInit {
  hotelDetils: any;
  petList: any;
  catList: any;
  petDetils: any;
  petListTemp: any;
  States: any;
  District: any;
  breed=this.gen.breed;
  Category: any;
  myFiles: any=[];
  Product_dtls: any;
  shop_id: any;
  shop_internalid: any;
  pager: any = {};
  pagedItems: any=[];
  show:boolean=false;
  UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
  isfilter: boolean=false;
  TempList!: Set<unknown>;


 

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private route:ActivatedRoute,private page:PagerService,private router:Router) {
    this.route.paramMap.subscribe(params=>{
      this.shop_id=params.get('id')
      this.shop_internalid=params.get('tepm_id')
    })
    
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
  petForm!: FormGroup;
  ngOnInit(): void {
  this.getPets();
  this.petForm = this.formBuilder.group({
    shop_dtls_id: [''],
    category_name: [''],
    category:[''],
    category_desc: [''],
    price: [''],
    brand_name:['',],
    age: ['',],
    sex: ['',],
    colour: ['',],
    weight: ['',],
    flavour: ['', ],
    age_range: ['',],
    target_species: ['',],
    breed_name: [''],
    discount:[],
    discount_type:[],
    user_id:[],
    image:[],
    type:[],
    shop_id:[this.shop_id],
    shop_internalid:[this.shop_internalid]



   });

   this.petForm.get('category')?.setValue('pet');
   this.Category='pet'


  }
  DeleteShop(doc_id:any){
    this.http.post(environment.apiUrl + '/apideleteshopitems',{shop_dtls_id:doc_id}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
         
     
      }})
  }
  viewDetails(_value:any,doc:any,type:any,cat:any){
    if(type=='eye'){
      doc.expanded=!doc.expanded;
    }
      this.http.post(environment.apiUrl + '/apigetparticularproductbyid',{shop_dtls_id:_value,category:cat}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.Product_dtls=response['shop_dtls']
        console.log(this.Product_dtls)
        // this.Category=this.Product_dtls[0].category;
        this.petForm.get('nick_name')?.setValue(this.Product_dtls[0].nick_name)
        this.petForm.get('breed_name')?.setValue(this.Product_dtls[0].breed_name)
        this.petForm.get('category')?.setValue(this.Product_dtls[0].category)
        this.petForm.get('category_desc')?.setValue(this.Product_dtls[0].category_desc)
        this.petForm.get('price')?.setValue(this.Product_dtls[0].price)
        // this.petForm.get('desc')?.setValue(this.petDetils[0].trainer_services)
        this.petForm.get('brand_name')?.setValue(this.Product_dtls[0]?.brand_name)
        this.petForm.get('age')?.setValue(this.Product_dtls[0]?.age)
        this.petForm.get('sex')?.setValue(this.Product_dtls[0]?.sex)
        this.petForm.get('colour')?.setValue(this.Product_dtls[0]?.color)
        this.petForm.get('weight')?.setValue(this.Product_dtls[0]?.item_weight)
        this.petForm.get('shop_id')?.setValue(this.Product_dtls[0]?.shop_id)
        this.petForm.get('flavour')?.setValue(this.Product_dtls[0]?.flavour)
        this.petForm.get('age_range')?.setValue(this.Product_dtls[0]?.age_range)
        this.petForm.get('target_species')?.setValue(this.Product_dtls[0]?.target_species)
        this.petForm.get('user_id')?.setValue(this.Product_dtls[0]?.user_id)
        this.petForm.get('discount')?.setValue(this.Product_dtls[0]?.discount)
        this.petForm.get('discount_type')?.setValue(this.Product_dtls[0]?.discount_type)
        this.petForm.get('category_name')?.setValue(this.Product_dtls[0]?.category_name)
        this.petForm.get('shop_dtls_id')?.setValue(this.Product_dtls[0]?.shop_dtls_id)
        this.petForm.get('type')?.setValue(this.Product_dtls[0]?.type)
        
        
        
         
console.log(response)
      }})
    
  }
  onChange(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.myFiles.push(file)
    }
  
  }


  onSubmit(){
    console.log(this.petForm.value);
    var formData = new FormData();
       
    for(let i=0;i<this.myFiles.length;i++){
      console.log(this.myFiles[i])
      formData.append('file',this.myFiles[i])
    }
    
  
  
       
       formData.append('shop_id',this.petForm.controls['shop_id'].value)
       formData.append('category_name',this.petForm.controls['category_name'].value)
       formData.append('category',this.petForm.controls['category'].value)
       formData.append('category_desc',this.petForm.controls['category_desc'].value)
       formData.append('price',this.petForm.controls['price'].value)
       formData.append('brand_name',this.petForm.controls['brand_name'].value)
       formData.append('age',this.petForm.controls['age'].value)
       formData.append('sex',this.petForm.controls['sex'].value)
       formData.append('colour',this.petForm.controls['colour'].value)
       formData.append('weight',this.petForm.controls['weight'].value)
       formData.append('flavour',this.petForm.controls['flavour'].value)
       formData.append('age_range',this.petForm.controls['age_range'].value)
       formData.append('target_species',this.petForm.controls['target_species'].value)
       formData.append('breed_name',this.petForm.controls['breed_name'].value)
       formData.append('discount',this.petForm.controls['discount'].value)
       formData.append('discount_type',this.petForm.controls['discount_type'].value)
       formData.append('user_id',this.petForm.controls['user_id'].value)
       formData.append('image',this.petForm.controls['image'].value)
       formData.append('type',this.petForm.controls['type'].value)
       formData.append('shop_dtls_id',this.petForm.controls['shop_dtls_id'].value)
       formData.append('shop_internalid',this.petForm.controls['shop_internalid'].value)
       formData.append('type',this.petForm.controls['type'].value)
       
    
      this.http.post(environment.apiUrl + '/apiaddshopdtls',formData).subscribe((response:any) => {
      
        if(response['status'] =='SUCCESS'){
        window.location.reload()      
      this.getPets();
 
        }
      });

  }
  getCategory(_value:any){
    this.Category=_value.target.value

  }

  getPets(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });

      this.http.post(environment.apiUrl + '/apigetproductritemsbyshopid',{shop_id:this.shop_id,shop_display_id:this.shop_internalid}).subscribe((response:any) => {
        if(response['status'] =='SUCCESS'){
          this.petListTemp= response['shop_dtls']
          for(let x of this.petListTemp ){
            x['expanded']=false
          }
          this.petList=this.petListTemp;
          
          this.setPage(1);
        }
     
        
    })

  }

  filter(place:any){
    this.isfilter=!this.isfilter;
   
    this.pagedItems= this.petList.filter((obj:any)=>{
      console.log(obj)
      return obj.category==place;

    })
    
  }
  filterdropdown(){
    this.isfilter=!this.isfilter;
  }


  setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.petList.length, page);
  
    // get current page of items
    this.pagedItems = this.petList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

}

