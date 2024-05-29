import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeFormComponent } from './transaction-type-form.component';

describe('TransactionTypeFormComponent', () => {
  let component: TransactionTypeFormComponent;
  let fixture: ComponentFixture<TransactionTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTypeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
