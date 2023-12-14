import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss'
})
export class ExchangeComponent {
  display = 0;
  currencies: string[] = [];
  http = inject(HttpClient);
  selectedCurrency: string = 'EUR';
  convertedAmount = 0;
  outputCurrency: string = 'PLN';

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies() {
    const url = 'https://open.er-api.com/v6/latest';
    this.http.get(url).subscribe((data: any) => {
      this.currencies = Object.keys(data.rates);
    });
  }

  ChooseButton(number: number): void {
    this.display = Number(this.display.toString() + number.toString());
    this.convertCurrency() ;
  }
  Reset(): void {
    this.display = 0;
    this.convertedAmount = 0;
  }

  Delete(): void {
    const amount = this.display.toString();
    this.display = +amount.slice(0, amount.length - 1);
    this.convertCurrency();
  }

  convertCurrency() {
    if (this.selectedCurrency && this.display && this.outputCurrency) {
      const url = `https://open.er-api.com/v6/latest`;
      this.http.get(url).subscribe((data: any) => {
        const exchangeRateFirst = data.rates[this.selectedCurrency];
        const exchangeSecond = data.rates[this.outputCurrency];
        const exchangeRate = exchangeRateFirst / exchangeSecond;
        this.convertedAmount = +(this.display / exchangeRate).toFixed(2);
      });
    }
  }
}
