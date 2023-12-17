import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bmi.component.html',
  styleUrl: './bmi.component.scss'
})


export class BmiComponent {

  age: number = 25;
  gender: 'Male' | 'Female' = 'Male';
  height: number = 180;
  weight: number = 60;

  bmi: number = 0;
  categoryOfBmi: string = '';

  getCountBMI(): void {
    this.bmi = +(this.weight / Math.pow(this.height, 2) * 10000).toFixed(2);
    this.getCategory(this.bmi);
    console.log(this.bmi)
  }

  getCategory(bmiValue: number): void {
      if(bmiValue < 19) {
        this.categoryOfBmi = 'Underweight';
      } else if(bmiValue >= 19 && bmiValue < 25) {
        this.categoryOfBmi = 'Normal';
      } else if(bmiValue >=25 && bmiValue < 30) {
        this.categoryOfBmi = 'Overweight';
      } else if(bmiValue > 30) this.categoryOfBmi = 'Obesity';
  }

  clear(): void {
    this.age = 2;
    this.weight = 0;
    this.bmi = 0;
    this.categoryOfBmi = '';
    this.height = 0;
  }
}
