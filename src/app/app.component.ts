import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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

  Reset() {
    this.firstNumber = null;
    this.secondNumber = null;
    this.display = '0';
  }
  ResetActual() {
    this.display = this.secondNumber ? this.secondNumber = '0' : this.firstNumber = '0';
  }

  ChooseButton(number: number): void {
    if (this.firstNumber) {
      this.firstNumber = this.firstNumber[0] === '0' ? this.firstNumber.slice(1) : this.firstNumber;
    }
    if (this.secondNumber) {
      this.secondNumber = this.secondNumber[0] === '0' ? this.secondNumber.slice(1) : this.secondNumber;
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
      this.firstNumber = getCount(Number(this.firstNumber), this.char, Number(this.secondNumber)).toString();
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
      this.firstNumber = getCount(Number(this.firstNumber), this.char, Number(this.secondNumber)).toString();
      this.secondNumber = null;
      this.char = null;
      this.display = this.firstNumber;
    }
  }

  Procent(): void {
    if(this.firstNumber && this.secondNumber && this.char === 'multiple') {
      this.firstNumber = (Number(this.firstNumber) * Number(this.secondNumber) / 100).toString();
      this.char = null;
      this.display = this.firstNumber;
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

const getCount = (firstNumber: number, char: string, secondNumber: number = 0): number => {
  switch (char) {
    case 'add': return firstNumber + secondNumber;
    case 'minus': return firstNumber - secondNumber;
    case 'multiple': return firstNumber * secondNumber;
    case 'divide': return firstNumber / secondNumber;
    default: return firstNumber;
  }
}
