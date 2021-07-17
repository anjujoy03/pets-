import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { Config, HomeMenu } from 'src/app/types';
import { environment } from 'src/environments/environment';
import {PagerService}    from './../../_services/index'


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  hotelDetils: any;
  petList: any;
  catList: any;
  petDetils: any;
  petListTemp: any;
  States: any;
  District: any;
  
  shoCert: boolean=false;
  show:boolean=false;
  UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
  dist:any=[];

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
      active: true,
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

  breed =[
    {
      value:'LABRADOR RETREVIERS'

  },
  {
    value:'GERMAN SHEPHERDS'

},
{
  value:'GOLDEN RETRIVERS'

},
{
  value:'BULLDOG'

},
{
  value:'BEAGLES'

},

  ]

  Logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  accountdropdown(){
    this.logactive=!this.logactive;
  }
   
   
  petForm!: FormGroup;
  myFiles:any=[];
  hotelList:any=[];
  pager: any = {};
   
  
  pagedItems: any=[];


    ngOnInit(): void {

      this.getPets();
      this.getCategory();
      this.getStates();
      
     
      this.petForm = this.formBuilder.group({
        nick_name: [''],
        breed_name: [''],
        cat_id:[''],
        is_certified: [''],
        price: [''],
        purpose:['',],
        age: ['',],
        sex: ['',],
        colour: ['',],
        weight: ['',],
        characerstics: ['', ],
        donation_reason: ['',],
        pincode: ['',],
        state: [''],
        district:[],
        user_id:localStorage.getItem('user_id'),
        desc:[''],
        pet_id:[''],
        pet_image:[''],
        cert_image:[''],


       });
     
  }
  
  get f() { return this.petForm.controls; }



  toggle(){
    this.show=!this.show;
    console.log(this.show)
  }
 
  onChange(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.myFiles.push(file)
    }

  }

  setGender(_value:any){
    this.petForm.get('sex')?.setValue(_value.target.value)
  }
  setCertified(_value:any){
    this.petForm.get('is_certified')?.setValue(_value.target.value)
  }

  onSubmit() {
    this.petForm.get('user_id')?.setValue(localStorage.getItem('user_id')); 
    console.log(this.petForm.value)
    

      
    var formData = new FormData();
   
    for(let i=0;i<this.myFiles.length;i++){
      console.log(this.myFiles[i])
      formData.append('myfile',this.myFiles[i])
    }
    
    
    

    
  
   
       
       formData.append('nick_name',this.petForm.controls['nick_name'].value)
       formData.append('breed_name',this.petForm.controls['breed_name'].value)
       formData.append('cat_id',this.petForm.controls['cat_id'].value)
       formData.append('is_certified',this.petForm.controls['is_certified'].value)
       formData.append('price',this.petForm.controls['price'].value)
       formData.append('desc',this.petForm.controls['desc'].value)
       formData.append('purpose',this.petForm.controls['purpose'].value)
       formData.append('age',this.petForm.controls['age'].value)
       formData.append('sex',this.petForm.controls['sex'].value)
       formData.append('colour',this.petForm.controls['colour'].value)
       formData.append('weight',this.petForm.controls['weight'].value)
       formData.append('characerstics',this.petForm.controls['characerstics'].value)
       formData.append('donation_reason',this.petForm.controls['donation_reason'].value)
       formData.append('state',this.petForm.controls['state'].value)
       formData.append('district',this.petForm.controls['district'].value)
       formData.append('user_id',this.petForm.controls['user_id']?.value)
       formData.append('pet_id',this.petForm.controls['pet_id'].value)
       formData.append('pincode',this.petForm.controls['pincode'].value)
      
    
      this.http.post(environment.apiUrl + '/apiaddproduct',formData).subscribe(response => {
         this.getPets();
      })
      
  }
  viewDetails(_value:any,pet:any){
    pet.expanded=!pet.expanded;
 
    this.http.post(environment.apiUrl + '/apipetdtls',{pet_id:_value}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
       console.log(response['pets_dtls'])
        this.petDetils=response['pets_dtls']

        if(this.petDetils[0].nick_name=='is_certified'){
          this.shoCert=true;

        }
        this.gen.getDistrictbyid(this.petDetils[0].state).subscribe((resp:any) => {
          this.District=resp['disrict']
        });

        this.petForm.get('nick_name')?.setValue(this.petDetils[0].nick_name);
        this.petForm.get('breed_name')?.setValue(this.petDetils[0].breed_name)
        this.petForm.get('cat_id')?.setValue(this.petDetils[0].cat_id)
        this.petForm.get('is_certified')?.setValue(this.petDetils[0].is_certified)
        this.petForm.get('price')?.setValue(this.petDetils[0].price)
        this.petForm.get('desc')?.setValue(this.petDetils[0].desc)
        this.petForm.get('purpose')?.setValue(this.petDetils[0].purpose)
        this.petForm.get('age')?.setValue(this.petDetils[0].age)
        this.petForm.get('sex')?.setValue(this.petDetils[0].sex)
        this.petForm.get('colour')?.setValue(this.petDetils[0].colour)
        this.petForm.get('weight')?.setValue(this.petDetils[0].weight)
        this.petForm.get('characerstics')?.setValue(this.petDetils[0].characerstics)
        this.petForm.get('donation_reason')?.setValue(this.petDetils[0].donation_reason)
        this.petForm.get('state')?.setValue(this.petDetils[0].state)
        this.petForm.get('district')?.setValue(this.petDetils[0].district)
        this.petForm.get('user_id')?.setValue(this.petDetils[0].user_id)
        this.petForm.get('pet_id')?.setValue(this.petDetils[0].pet_id)
        this.petForm.get('pincode')?.setValue(this.petDetils[0].pincode)
      

     
        
       
     
      }
  
});
  }
  Deletepets(_value:any){
      this.http.post(environment.apiUrl + '/apidelete',{pet_id:_value}).subscribe((response:any) => {
        if(response['status']='SUCCESS'){
          this.getPets();

        }
      })

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


   


  getPets(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });

  
    
      this.http.post(environment.apiUrl + '/apigetpets',{headers:reqHeader}).subscribe((response:any) => {
        if(response['status'] =='SUCCESS'){
          this.petListTemp= response['pets_list']
          for(let x of this.petListTemp ){
            x['expanded']=false
          }
          this.petList=this.petListTemp;
         
          // initialize to page 1
          this.setPage(1);
          
        }
     
        
    })


  }


  getdist(){
    this.http.post(environment.apiUrl + '/apigetdist',{headers:''}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.dist= response['district']
      
        
      }
   
      
  })
    
  }
  setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.petList.length, page);
  
    // get current page of items
    this.pagedItems = this.petList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getCategory(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });

    
    
      this.http.post(environment.apiUrl + '/apigetgenerlcategory',{headers:reqHeader}).subscribe((response:any) => {
        if(response['status'] =='SUCCESS'){
          this.catList=response['cat_list_list']
          console.log(this.catList)
          
        }
     
        
    })
  }
}
