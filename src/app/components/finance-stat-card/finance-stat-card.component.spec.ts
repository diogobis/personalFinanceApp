import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceStatCardComponent } from './finance-stat-card.component';

describe('FinanceStatCardComponent', () => {
  let component: FinanceStatCardComponent;
  let fixture: ComponentFixture<FinanceStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceStatCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
