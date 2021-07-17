import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {GeneralserviceService} from '../../generalservice.service'

@Component({
  selector: 'app-addshop',
  templateUrl: './addshop.component.html',
  styleUrls: ['./addshop.component.css']
})
export class AddshopComponent implements OnInit {

  TrainerDetils: any;
  Trainers: any=[];
  doctorDetils: any;
  States: any;
  District: any;

  constructor(private fb: FormBuilder,private http:HttpClient,private gen:GeneralserviceService) {}

  
 
  shopsForm:FormGroup | undefined;
  myFiles:any=[];
  doctorList:any=[];

    ngOnInit(): void {
      this.shopsForm = this.fb.group({
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
    


        
    console.log(this.shopsForm?.value)
          
        var formData = new FormData();
       
        for(let i=0;i<this.myFiles.length;i++){
          console.log(this.myFiles[i])
          formData.append('myfile',this.myFiles[i])
        }
        
      
           
          //  formData.append('shop_name',this.shopForm.controls['shop_name'].value)
          //  formData.append('shop_address',this.shopForm.controls['shop_address'].value)
          //  formData.append('shop_pincode',this.shopForm.controls['shop_pincode'].value)
          //  formData.append('shop_place',this.shopForm.controls['shop_place'].value)
          //  formData.append('shop_district',this.shopForm.controls['shop_district'].value)
          //  formData.append('shop_state',this.shopForm.controls['shop_state'].value)
          //  formData.append('shop_country',this.shopForm.controls['shop_country'].value)
          //  formData.append('shop_desc',this.shopForm.controls['shop_desc'].value)
          //  formData.append('user_id',this.shopForm.controls['user_id'].value)
          //  formData.append('password',this.shopForm.controls['password'].value)
          //  formData.append('phone_number',this.shopForm.controls['phone_number'].value)
          //  formData.append('shop_id',this.shopForm.controls['shop_id'].value)
        
          // this.http.post(environment.apiUrl + '/apiaddproduct',formData).subscribe(response => {
          
          //    console.log(response)
          // })
      }
}
