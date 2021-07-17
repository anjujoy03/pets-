import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { environment } from 'src/environments/environment';
import { Config, Menu } from '../../types';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
 show=false;
 UserId=localStorage.getItem('user_id')
  logactive: boolean=false;

 constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private cdref: ChangeDetectorRef,private router:Router) {
    
}

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
 

  DeliveryForm!: FormGroup;
  editflag=false;



  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngOnInit(): void {

  this.DeliveryForm = this.formBuilder.group({
    delivery_id: [''],
    deliver_charge: [''],
    delivery_note:[''],
    price_condition: [''],



   });
   this.getDeliverycharge();
  }

  toggle(){
    this.show=!this.show;
    console.log(this.show)
  }
  getDeliverycharge(){
    this.http.post(environment.apiUrl + '/apigetdeliverycharge',{'user_id':'admin'}).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
        console.log(response['delivery'])
        this.DeliveryForm.get('delivery_id')?.setValue(response['delivery'][0].delivery_id)
        this.DeliveryForm.get('deliver_charge')?.setValue(response['delivery'][0].deliver_charge)
        this.DeliveryForm.get('delivery_note')?.setValue(response['delivery'][0].delivery_note)
        this.DeliveryForm.get('price_condition')?.setValue(response['delivery'][0].free_deliver_above)

        // this.Delivery=response['delivery']
      }

  })
  }
  chngesidebar(){
    this.show=!this.show;
  }
  DeliverySetting(){
    this.http.post(environment.apiUrl + '/apiadddelivery',this.DeliveryForm.value).subscribe((response:any) => {
      if(response['status'] =='SUCCESS'){
      }
    

  });

}
}