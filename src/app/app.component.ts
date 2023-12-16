import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ExchangeComponent} from './exchange/exchange.component';
import { RegularCalculatorComponent } from './regular-calculator/regular-calculator.component';
import { BmiComponent } from './bmi/bmi.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ExchangeComponent,
    RegularCalculatorComponent,
    BmiComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isMenu = false;
  option = 'Calculator';

  changeOptions(option: string) :void {
    this.option = option;
    this.isMenu = false;
  }

  openMenu():void {
    this.isMenu = !this.isMenu;
  }
}
