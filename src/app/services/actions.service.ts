import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor() { }

  getCount(firstNumber: number, char: string, secondNumber: number = 0): number {
    switch (char) {
      case 'add': return firstNumber + secondNumber;
      case 'minus': return firstNumber - secondNumber;
      case 'multiple': return firstNumber * secondNumber;
      case 'divide': return firstNumber / secondNumber;
      default: return firstNumber;
    }
  }
}
