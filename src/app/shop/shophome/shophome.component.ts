import { Component, AfterViewInit, ElementRef, ViewChild , OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralserviceService } from 'src/app/generalservice.service';
import { environment } from 'src/environments/environment';
import { PagerService } from 'src/app/_services';
import { DatePipe } from '@angular/common';

import * as  Chart from 'chart.js';
import { Config, Menu } from 'src/app/types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shophome',
  templateUrl: './shophome.component.html',
  styleUrls: ['./shophome.component.css']
})
export class ShophomeComponent implements OnInit {
  @ViewChild('barCanvas')
  private barCanvas!: ElementRef;
  @ViewChild('SalesCanvas')
  private SalesCanvas!: ElementRef;
  
  barChart: any;
  prodList: any=[];
  TotalProdcut:any=[];
  UserList:any=[];
  order:any=[];
  TotalOrdersPermonth:any=[];
  TotalSalesPermonth:any=[];
  SaleChart:any;
  recentUsers:any=[];
  pager: any = {};
  pagedItems: any=[];
  show=false;
  UserId=localStorage.getItem('user_id');
  RecentTransaction:any=[];
  logactive: boolean=false;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private gen:GeneralserviceService,private page:PagerService,private pipe:DatePipe,private router:Router) {}

  options: Config = { multi: false };
  menus: Menu[] = [
    {
      name: 'Dashboard',
      iconClass: '../../../assets/img/dashboard.png',
      active: true,
      submenu: [
        { name: 'Home', url: 'shop/shophome' ,icon:''},
      
  
      ]
    },
    { 
      name: 'Products',
      iconClass: '../../../assets/img/product.png',
      active: false,
      submenu: [
        { name: 'Shop', url: 'shop/pet' ,icon:''},

       

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
    { 
      name: 'Reports',
      iconClass: '../../../assets/img/categories.png',
      active: false,
      submenu: [
        { name: 'Sales Report', url: 'shop/shophome' ,icon:''},

      ]
    },

   
  ];
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


  ngOnInit(): void {
    this.getfeturedproduct();
    this.gethomedetails();
    this.getChart();
  }

  ngAfterViewInit(): void {
    this.barChartMethod();
    this.SalesChart()
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Orders',
          barThickness: 6,  // number (pixels) or 'flex'
          maxBarThickness: 8 ,// number (pixels),
          data:[],
          backgroundColor: [
            // 'rgba(255, 99, 132, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
       
        scales: {
          yAxes: [{
            ticks: {
              padding: 20,
              beginAtZero: true
            }
          }],
          xAxes: [{
           
        }]
        },
      
      }
    });
  }
  SalesChart()
{
  this.SaleChart = new Chart(this.SalesCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Sales',
        barThickness: 6,  // number (pixels) or 'flex'
        maxBarThickness: 8 ,// number (pixels),
        data:[],
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    
    options: {
      scales: {
        yAxes: [{
          ticks: {
            padding: 20,
            beginAtZero: true
          }
        }]
      }
    }
  });

}
  // localStorage.getItem('user_id')
  getfeturedproduct(){
    this.http.post(environment.apiUrl + '/apiget_fetured_product',{user_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){
        this.prodList=response['shop_dtls'];
      } 
   });

  }
   gethomedetails(){
    this.http.post(environment.apiUrl + '/apigetshophomedetails',{shop_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){
        this.TotalProdcut=response['total_product'];
          this.UserList=response['user_list']
          this.order=response['order']
          this.RecentTransaction=response['recent_transactions'];
          console.log(this.RecentTransaction);
      }
   });
   }
   setPage(page: number) {
    console.log(page)
    // get pager object from service
    this.pager = this.page.getPager(this.recentUsers.length, page);
  
    // get current page of items
    this.pagedItems =this.recentUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }
   getChart(){
     this.http.post(environment.apiUrl + '/apiget_chart_data',{shop_id:localStorage.getItem('user_id')}).subscribe((response:any) => {
      if(response.status=='SUCCESS'){
        this.TotalOrdersPermonth=response['total_orderpermonth'];
        this.TotalSalesPermonth=response['total_sales'];
        this.recentUsers=response['recent_user'];
        this.setPage(1)
        
        
        for(let x of this.TotalOrdersPermonth ){
          this.barChart.data.labels.push(x['month'])
          this.barChart.data.datasets[0].data.push(x['total_orders'])
          this.barChart.data.datasets[0].backgroundColor.push('orangered')


        }
        this.barChart.update();
        for(let x of this.TotalSalesPermonth ){
          this.SaleChart.data.labels.push(x['month'])
          this.SaleChart.data.datasets[0].data.push(x['total_sales'])
          this.SaleChart.data.datasets[0].backgroundColor.push('green')


        }
        this.SaleChart.update();
 
      }
   });
   }

  
}
