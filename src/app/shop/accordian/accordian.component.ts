import { Component, OnInit, Input } from '@angular/core';
import { Config, Menu } from '../../types';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent implements OnInit {

  @Input() options: any;
  @Input()
  menus!: Menu[];
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

  toggle(index: number) {

    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }

    this.menus[index].active = !this.menus[index].active;
  }
}
