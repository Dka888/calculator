import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ExchangeComponent} from './exchange/exchange.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ExchangeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Calculator';
  firstNumber: string | null = null;
  secondNumber: string | null = null;
  display: string | null = null;
  char: string | null = null;
  memory: string | null = null;
  isMenu = false;

  options = ['Calculator', 'Exchange', 'BMI']
  option = 'Calculator';

  changeOptions(option: string) :void {
    this.option = option;
    this.isMenu = false;
  }

  openMenu():void {
    this.isMenu = !this.isMenu;
  }

  Reset(): void {
    this.firstNumber = '0';
    this.secondNumber = null;
    this.display = '0';
  }

  ResetActual(): void {
    this.display = this.secondNumber ? this.secondNumber = '0' : this.firstNumber = '0';
  }

  ChooseButton(number: number): void {
    if (this.firstNumber) {
      this.firstNumber = this.firstNumber[0] === '0' && this.firstNumber[1] !== '.' ? this.firstNumber.slice(1) : this.firstNumber;
    }
    if (this.secondNumber) {
      this.secondNumber = this.secondNumber[0] === '0' && this.secondNumber[1] !== '.' ? this.secondNumber.slice(1) : this.secondNumber;
    }
    if (!this.char && this.firstNumber) {
      this.firstNumber += number.toString();
    }
    if (!this.firstNumber) {
      this.firstNumber = number.toString();
    }
    if (this.secondNumber) {
      this.secondNumber += number.toString();
    }
    if (this.char && this.firstNumber && !this.secondNumber) {
      this.secondNumber = number.toString();
    }

    this.display = this.secondNumber ? this.secondNumber : this.firstNumber;
  }
  ChooseChar(char: string): void {
    if (!this.secondNumber) {
      this.char = char;
    }
    if (this.secondNumber && this.char) {
      this.firstNumber = getCount(Number(this.firstNumber), this.char, Number(this.secondNumber));
      this.secondNumber = null;
      this.display = this.firstNumber;
    }
  }
  ChangeSymbol(): void {
    this.display === this.secondNumber
      ? this.secondNumber = (Number(this.secondNumber) * (-1)).toString()
      : this.firstNumber = (Number(this.firstNumber) * (-1)).toString()
    this.display = (Number(this.display) * (-1)).toString();
  }
  Count(): void {
    if (this.char) {
      this.firstNumber = getCount(Number(this.firstNumber), this.char, Number(this.secondNumber));
      this.secondNumber = null;
      this.char = null;
      this.display = this.firstNumber;
    }
  }

  Procent(): void {
    if(this.firstNumber && this.secondNumber) {
        switch(this.char) {
          case 'multiple':
          this.firstNumber = (Number(this.firstNumber) * Number(this.secondNumber) / 100).toString();
          this.char = null;
          this.display = this.firstNumber;
          break;
          case 'add':
            this.firstNumber = (Number(this.firstNumber) + Number(this.firstNumber) * Number(this.secondNumber) / 100).toString();
            this.char = null;
            this.display = this.firstNumber;
          break;
          case 'minus':
            this.firstNumber = (Number(this.firstNumber) - Number(this.firstNumber) * Number(this.secondNumber) / 100).toString();
            this.char = null;
            this.display = this.firstNumber;
            break;
          default: this.char = null;
        }
      }
  }

  SetMemory(): void {
    if(this.display) this.memory = this.display;
  }

  AddToMemory(): void {
    this.memory = (Number(this.memory) + Number(this.display)).toString();

  }

  MinusFromMemory(): void {
    this.memory = (Number(this.memory) - Number(this.display)).toString();
  }

  ResetMemory(): void  {
    this.memory = null;
  }

  ShowMemory(): void {
    this.display = this.memory;
  }

  GetComa(): void {
    if(this.secondNumber && !this.secondNumber.includes('.')) {
      this.secondNumber += '.';
      this.display = this.secondNumber;
    } else if(this.firstNumber && !this.firstNumber.includes('.')){
      this.firstNumber += '.';
      this.display = this.firstNumber;
    } else {
      this.firstNumber = '0.';
      this.display = this.firstNumber;
    }
  }

  getFraction(): void {
    if (this.display === this.firstNumber) {
      this.firstNumber = removeZeros((1 / Number(this.firstNumber)).toFixed(10));
      this.display = this.firstNumber;
    }
    if (this.display === this.secondNumber) {
      this.firstNumber = removeZeros((1 / Number(this.secondNumber)).toFixed(10));
      this.display = this.secondNumber;
    }
  }

  getPower(): void {
    if (this.display === this.firstNumber) {
      this.firstNumber = removeZeros(Math.pow(Number(this.firstNumber), 2).toFixed(10));
      this.display = this.firstNumber;
    }
    if (this.display === this.secondNumber) {
      this.secondNumber = removeZeros(Math.pow(Number(this.secondNumber), 2).toFixed(10));
      this.display = this.secondNumber;
    }
  }

  getSquare(): void {
    if (this.display === this.firstNumber) {
      this.firstNumber = removeZeros(Math.sqrt(Number(this.firstNumber)).toFixed(10));
      this.display = this.firstNumber;
    }
    if (this.display === this.secondNumber) {
      this.secondNumber = removeZeros(Math.sqrt(Number(this.secondNumber)).toFixed(10));
      this.display = this.secondNumber;
    }
  }

  Delete(): void {
    if (this.secondNumber) {
      this.secondNumber = this.secondNumber.slice(0, this.secondNumber.length - 1);
      this.display = this.secondNumber;
    } else if (this.firstNumber) {
      this.firstNumber = this.firstNumber.slice(0, this.firstNumber.length - 1);
      this.display = this.firstNumber;
    }
  }
}

const getCount = (firstNumber: number, char: string, secondNumber: number = 0): string => {
  switch (char) {
    case 'add':
      const sum = (firstNumber + secondNumber).toFixed(10);
      return removeZeros(sum);
    case 'minus':
      const result = (firstNumber - secondNumber).toFixed(10);
      return removeZeros(result);
    case 'multiple':
      const multiply = (firstNumber * secondNumber).toFixed(10);
      return removeZeros(multiply);
    case 'divide':
      const devideResult = (firstNumber / secondNumber).toFixed(10);
      return removeZeros(devideResult);
    default: return firstNumber.toString();
  }
}

const removeZeros = (number: string): string => {
  if (number.includes('.')) {
    if (number[number.length - 1] !== '0' && number[number.length - 1] !== '.') {
      return number;
    }
    if(number[number.length - 1] === '.') {
      return number.slice(0, number.length - 1);
    }
    const arrayOfNUmbers = number.split('');
    arrayOfNUmbers.pop();
    return removeZeros(arrayOfNUmbers.join(''));
  }
  return number;
}
