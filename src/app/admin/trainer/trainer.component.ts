import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { Config, HomeMenu } from 'src/app/types';
import { environment } from 'src/environments/environment';
import {PagerService}    from './../../_services/index';
@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  TrainerDetils: any;
  Trainers: any=[];
  States: any;
  District: any;
  logactive: boolean=false;
  isfilter: boolean=false;
  dist: any;
  isShown: boolean = false ; 

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private router:Router) {}

 
  trainerForm!: FormGroup;
  myFiles:any=[];
  hotelList:any=[];
  pager: any = {};
   
  
  pagedItems: any=[];
  show:boolean=false;
  UserId=localStorage.getItem('user_id');

  
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
      active: true,
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
  filterdropdown(){
    this.isfilter=!this.isfilter;
  }
  toggleShow() {

    this.isShown = ! this.isShown;
    
    }
  getdist(){
    this.http.post(environment.apiUrl + '/apigetdist',{headers:''}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.dist= response['district']
      
        
      }
   
      
  })
    
  }

    ngOnInit(): void {
      this.trainerForm = this.formBuilder.group({
        trainer_name: [''],
        trainer_adress: [''],
        trainer_district:[''],
        trainer_state: [''],
        trainer_place: [''],
        trainer_services:['',],
        contact_number :[''],
        email: ['',],
        gender: ['',],
        fess: ['',],
        consulting_time:['',],
        consulting_days: ['',],
        membership:['',],
        user_id:[localStorage.getItem('user_id')],
        trainer_id:['',],
        image:[]
       });
   this.getAlltriuners()
   this.getStates();
   this.getdist();
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
  
  get f() { return this.trainerForm.controls; }
  viewDetails(_value:any,trainer:any,type:any){
    if(type=='eye'){
   trainer.expanded=!trainer.expanded
    }
    var formData = new FormData();
    formData.append('trainer_id',_value)
    this.http.post(environment.apiUrl + '/apigettrainerbyid',formData).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.TrainerDetils=response['pets_dtls'];
        this.gen.getDistrictbyid(this.TrainerDetils[0].trainer_state).subscribe((resp:any) => {
          this.District=resp['disrict']
        });

        this.trainerForm.get('trainer_name')?.setValue(this.TrainerDetils[0].trainer_name)
        this.trainerForm.get('trainer_adress')?.setValue(this.TrainerDetils[0].trainer_adress)
        this.trainerForm.get('trainer_district')?.setValue(this.TrainerDetils[0].trainer_district)
        this.trainerForm.get('trainer_state')?.setValue(this.TrainerDetils[0].trainer_state)
        this.trainerForm.get('trainer_place')?.setValue(this.TrainerDetils[0].trainer_place)
        this.trainerForm.get('trainer_services')?.setValue(this.TrainerDetils[0].trainer_services)
        this.trainerForm.get('contact_number')?.setValue(this.TrainerDetils[0].contact_number)
        this.trainerForm.get('trainer_place')?.setValue(this.TrainerDetils[0].trainer_place)
        this.trainerForm.get('gender')?.setValue(this.TrainerDetils[0].gender)
        this.trainerForm.get('fess')?.setValue(this.TrainerDetils[0].fess)
        this.trainerForm.get('consulting_time')?.setValue(this.TrainerDetils[0].consulting_time)
        this.trainerForm.get('consulting_days')?.setValue(this.TrainerDetils[0].consulting_days)
        this.trainerForm.get('trainer_id')?.setValue(this.TrainerDetils[0].trainer_id)
        this.trainerForm.get('user_id')?.setValue(this.TrainerDetils[0].user_id)
        this.trainerForm.get('membership')?.setValue(this.TrainerDetils[0].membership)
        this.trainerForm.get('email')?.setValue(this.TrainerDetils[0].email)
        
        
      

        
       
     
      }
  
});
  }
  getAlltriuners(){
    this.http.post(environment.apiUrl + '/apigetallthetrainers',{id:'admin'}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        for(let x of response['pets_dtls'] ){
          x['expanded']=false
        }
        this.Trainers=response['pets_dtls']; 
        this.setPage(1);
     
      }})
  }
  
  filter(place:any){
    this.isfilter=!this.isfilter;
    this.pagedItems= this.Trainers.filter((obj:any)=>{
      console.log(obj)
      return obj.trainer_district==place;

    })
    console.log( this.pagedItems)
  }
  DeleteTrainers(trainer_id:any,index:number){
    var formData = new FormData();
    formData.append('trainer_id',trainer_id)
    this.http.post(environment.apiUrl + '/apideletetrainer',formData).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.Trainers.splice(index,1)
        this.getAlltriuners();
     
      }})
  }
  setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.Trainers.length, page);
  
    // get current page of items
    this.pagedItems = this.Trainers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

  onChange(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.myFiles.push(file)
    }
  }

  onSubmit() {
      var formData = new FormData();
      for(let i=0;i<this.myFiles.length;i++){
        console.log(this.myFiles[i])
        formData.append('myfile',this.myFiles[i])
      }
      formData.append('trainer_name',this.trainerForm.controls['trainer_name'].value)
       formData.append('trainer_adress',this.trainerForm.controls['trainer_adress'].value)
       formData.append('trainer_district',this.trainerForm.controls['trainer_district'].value)
       formData.append('trainer_state',this.trainerForm.controls['trainer_state'].value)
       formData.append('trainer_services',this.trainerForm.controls['trainer_services'].value)
       formData.append('contact_number',this.trainerForm.controls['contact_number'].value)
       formData.append('gender',this.trainerForm.controls['gender'].value)
       formData.append('fess',this.trainerForm.controls['fess'].value)
       formData.append('consulting_time',this.trainerForm.controls['consulting_time'].value)
       formData.append('trainer_id',this.trainerForm.controls['trainer_id'].value)
       formData.append('consulting_days',this.trainerForm.controls['consulting_days'].value)
       formData.append('trainer_place',this.trainerForm.controls['trainer_place'].value)
       formData.append('email',this.trainerForm.controls['email'].value)
       formData.append('user_id',this.trainerForm.controls['user_id'].value)
       formData.append('membership',this.trainerForm.controls['membership'].value)
       
      this.http.post(environment.apiUrl + '/apiadd_trainer',formData).subscribe((response:any) => {

        if(response['status'] =='SUCCESS'){
          window.location.reload();
    this.getAlltriuners();
   
        }
      
      })
  }
}
