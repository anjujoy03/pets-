import { Component, Input, OnInit } from '@angular/core';
import { Config, Menu,HomeMenu } from 'src/app/types';

@Component({
  selector: 'app-admiaccordian',
  templateUrl: './admiaccordian.component.html',
  styleUrls: ['./admiaccordian.component.css']
})
export class AdmiaccordianComponent implements OnInit {
  @Input() options: any;
  @Input()
  menus!: HomeMenu[];
  config!: Config;
  
  ngOnInit() {
    this.config = this.mergeConfig(this.options);
  }

  mergeConfig(options: Config) {
   
    const config = {
    
      multi: true
    };

    return { ...config, ...options };
  }

}
