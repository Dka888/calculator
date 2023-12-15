import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularCalculatorComponent } from './regular-calculator.component';

describe('RegularCalculatorComponent', () => {
  let component: RegularCalculatorComponent;
  let fixture: ComponentFixture<RegularCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegularCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
