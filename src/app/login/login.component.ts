import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isSubmitted: boolean=false;
  Message: void;


    constructor( private router: Router, private formBuilder: FormBuilder,private http:HttpClient) { }
    loginForm!: FormGroup;
    ngOnInit(): void {
      this.loginForm  =  this.formBuilder.group({
  
        user_id: ['', Validators.required],
        password: ['', Validators.required]
    });
    }


    get f() { return this.loginForm.controls; }
  
  
    onSubmit(): void {
      this.isSubmitted = true;
      if(this.loginForm.invalid){
        return;
      }
      this.http.post(environment.apiUrl + '/apiauth',this.loginForm.value).subscribe((response:any) => {
        if(response.status=='SUCCESS'){
          console.log(response)
        localStorage.setItem('user_id',response.data['user_id'])
        localStorage.setItem('token',response.data['token'])
        localStorage.setItem('user_type',response.data.user_type)
        console.log(response.data)
        if(response.data.user_type=='shop'){
          this.router.navigate(['shop/shophome'])
        }
        else
        {
          this.router.navigate(['admin/home'])
        }
       
        }
        else{
          this.Message=response.message
        }

     
      
        
          
      })
     
    }

}
