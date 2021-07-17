import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { environment } from 'src/environments/environment';
import { Config, Menu } from '../../types';
import { PagerService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
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
  logactive: boolean=false;
  isfilter: boolean=false;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private router:Router) {
    
  }
  show=false;
 UserId=localStorage.getItem('user_id');
 pager: any = {};
   
  
 pagedItems: any=[];


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
      active: true,
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
  Logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  accountdropdown(){
    this.logactive=!this.logactive;
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
    shop_id:[],
    shop_internalid:[localStorage.getItem('user_id')]



   });
  }
  DeleteShop(doc_id:any){
    this.http.post(environment.apiUrl + '/apideleteshopitems',{shop_dtls_id:doc_id}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
         
     
      }})
  }
  viewDetails(_value:any,item:any,type:any,cat:any){
    if(type=='eye'){
      item=!item;
    }
      this.http.post(environment.apiUrl + '/apigetparticularproductbyid',{shop_dtls_id:_value,category:cat}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.Product_dtls=response['shop_dtls']
        console.log(this.Product_dtls)
        this.Category=this.Product_dtls[0].category;
        this.petForm.get('nick_name')?.setValue(this.Product_dtls[0].nick_name)
        this.petForm.get('breed_name')?.setValue(this.Product_dtls[0].breed_name)
        this.petForm.get('category')?.setValue(this.Product_dtls[0].category)
        this.petForm.get('category_desc')?.setValue(this.Product_dtls[0].category_desc)
        this.petForm.get('price')?.setValue(this.Product_dtls[0].price)
        // this.petForm.get('desc')?.setValue(this.petDetils[0].trainer_services)
        this.petForm.get('brand_name')?.setValue(this.Product_dtls[0]?.brand_name)
        this.petForm.get('age')?.setValue(this.Product_dtls[0]?.age)
        this.petForm.get('sex')?.setValue(this.Product_dtls[0]?.sex)
        this.petForm.get('colour')?.setValue(this.Product_dtls[0]?.colour)
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
       
    
      this.http.post(environment.apiUrl + '/apiaddshopdtls',formData).subscribe((response:any) => {
      
        if(response['status'] =='SUCCESS'){
window.location.reload()      
     
 
        }
      });

  }
  getCategory(_value:any){
    this.Category=_value.target.value

  }
  toggle(){
    this.show=!this.show;
    console.log(this.show)
  }
  setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.petList.length, page);
  
    // get current page of items
    this.pagedItems =this.petList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

  getPets(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });

      this.http.post(environment.apiUrl + '/apigetproductritemsbyshopid',{shop_id:'',shop_display_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
        if(response['status'] =='SUCCESS'){
          this.petListTemp= response['shop_dtls']
          for(let x of this.petListTemp ){
            x['expanded']=false
          }
          this.petList=this.petListTemp;
          this.setPage(1)
        }
     
        
    })

  }

}
