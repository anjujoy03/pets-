import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {GeneralserviceService} from '../../generalservice.service';
import {PagerService}    from './../../_services/index';
import {DatePipe} from '@angular/common'
import { Config, HomeMenu } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  TrainerDetils: any;
  Trainers: any=[];
  doctorDetils: any;
  States: any;
  District: any;
  pager: any = {};
   
  
  pagedItems: any=[];



 
  doctorForm!: FormGroup;
  myFiles:any=[];
  doctorList:any=[];
  show:boolean=false;
  UserId=localStorage.getItem('user_id');
  logactive: boolean=false;
  isfilter: boolean=false;
  isShown: boolean = false ; 

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private pipe:DatePipe,private router:Router) {
    
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
      active: true,
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


  Logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  accountdropdown(){
    this.logactive=!this.logactive;
  }
 filterdropdown(){
    this.isfilter=!this.isfilter;
  } 
  toggleShow() {

    this.isShown = ! this.isShown;
    
    }

    ngOnInit(): void {
      this.doctorForm = this.formBuilder.group({
        adress: [''],
        consultation_time: [''],
        doc_name:[''],
        place: [''],
        medicine_type: [''],
        memb_details:['',],
        licence_number :[''],
        date_certicialtion: ['',],
        doc_no: ['',],
        consulting_days: ['',],
        consulting_time:[''],
        contact_number: ['',],
        speciality:[''],
        gender:[''],
        fees:[''],
        doc_id:[''],
        state:[''],
        clinic_name:[''],
        image:[''],
  

        user_id:[localStorage.getItem('user_id')],
 


       });
  this.getAlldoctors()
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
    formData.append('adress',this.doctorForm.controls['adress'].value)
    formData.append('consultation_time',this.doctorForm.controls['consultation_time'].value)
    formData.append('doc_name',this.doctorForm.controls['doc_name'].value)
    formData.append('place',this.doctorForm.controls['place'].value)
    formData.append('medicine_type',this.doctorForm.controls['medicine_type'].value)
    formData.append('memb_details',this.doctorForm.controls['memb_details'].value)
    formData.append('licence_number',this.doctorForm.controls['licence_number'].value)
    formData.append('date_certicialtion',this.doctorForm.controls['date_certicialtion'].value)
    formData.append('doc_no',this.doctorForm.controls['doc_no'].value)
    formData.append('consulting_days',this.doctorForm.controls['consulting_days'].value)
    formData.append('consulting_time',this.doctorForm.controls['consulting_time'].value)
    formData.append('contact_number',this.doctorForm.controls['contact_number'].value)
    formData.append('speciality',this.doctorForm.controls['speciality'].value)
    formData.append('gender',this.doctorForm.controls['gender'].value)
    formData.append('fees',this.doctorForm.controls['fees'].value)
    formData.append('doc_id',this.doctorForm.controls['doc_id'].value)
    
    formData.append('state',this.doctorForm.controls['state'].value)
    
    formData.append('clinic_name',this.doctorForm.controls['clinic_name'].value)
    
    formData.append('image',this.doctorForm.controls['image'].value)
    formData.append('user_id',this.doctorForm.controls['user_id'].value)

      this.http.post(environment.apiUrl + '/apiadd_doctor',formData).subscribe((response:any) => {
      
        if(response['status'] =='SUCCESS'){
          window.location.reload();
          this.getAlldoctors();
   
        }})
         
    
  }
  DeleteDoctors(doc_id:any,index:number){
    this.http.post(environment.apiUrl + '/apideletedoctor',{doc_id:doc_id}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.doctorList.splice(index,1)
        this.getAlldoctors();
      }})
  }

  filter(place:any){
    this.isfilter=!this.isfilter;
    this.pagedItems= this.doctorList.filter((obj:any)=>{
      console.log(obj)
      return obj.place==place;

    })
    console.log( this.pagedItems)
  }
  viewDetails(_value:any,doc:any,type:any){
    if(type=='eye'){
      doc.expanded=!doc.expanded;
    }

    
    this.http.post(environment.apiUrl + '/apigetdoctorsbyid',{doc_id:_value}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        this.doctorDetils=response['doc_dtls'];
        console.log(this.doctorDetils[0].date_certicialtion);
        this.gen.getDistrictbyid(this.doctorDetils[0].lat).subscribe((resp:any) => {
          this.District=resp['disrict']
        });

        this.doctorForm.get('doc_name')?.setValue(this.doctorDetils[0].doc_name)
        this.doctorForm.get('consultation_time')?.setValue(this.doctorDetils[0].consultation_time)
        this.doctorForm.get('place')?.setValue(this.doctorDetils[0].place)
        this.doctorForm.get('medicine_type')?.setValue(this.doctorDetils[0].medicine_type)
        this.doctorForm.get('memb_details')?.setValue(this.doctorDetils[0].memb_details)
        this.doctorForm.get('licence_number')?.setValue(this.doctorDetils[0].licence_number)
        this.doctorForm.get('contact_number')?.setValue(this.doctorDetils[0].contact_number)
        this.doctorForm.get('fees')?.setValue(this.doctorDetils[0].doc_no)
        this.doctorForm.get('consulting_days')?.setValue(this.doctorDetils[0].consulting_days)
        this.doctorForm.get('date_certicialtion')?.setValue(this.pipe.transform(this.doctorDetils[0].date_certicialtion,'mm/dd/yyyy'))
        this.doctorForm.get('gender')?.setValue(this.doctorDetils[0].gender)
        this.doctorForm.get('speciality')?.setValue(this.doctorDetils[0].speciality)
        this.doctorForm.get('state')?.setValue(this.doctorDetils[0].lat)
        this.doctorForm.get('doc_id')?.setValue(this.doctorDetils[0].doc_id)
        this.doctorForm.get('adress')?.setValue(this.doctorDetils[0].adress)
        this.doctorForm.get('clinic_name')?.setValue(this.doctorDetils[0].clinic_name)
        
        
        
        

        
       
     
      }
  
});
  }
  toggle(){
    this.show=!this.show;
    console.log(this.show)
  }


  getAlldoctors(){
    this.http.post(environment.apiUrl + '/apigetallthedoctors',this.doctorForm.value).subscribe((response:any) => {
      for(let x of response['doc_dtls'] ){
        x['expanded']=false
      }
      
      this.doctorList=response['doc_dtls'];
      this.setPage(1);
      console.log(this.doctorList)
   })

  }
  setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.doctorList.length, page);
  
    // get current page of items
    this.pagedItems = this.doctorList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

  



}
