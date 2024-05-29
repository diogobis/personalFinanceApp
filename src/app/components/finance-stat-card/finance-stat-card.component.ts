import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-finance-stat-card',
  standalone: true,
  imports: [DecimalPipe],
  providers: [DecimalPipe],
  templateUrl: './finance-stat-card.component.html',
  styleUrl: './finance-stat-card.component.css',
})
export class FinanceStatCardComponent implements AfterViewInit {
  @Input() label: string | undefined = '';
  @Input() filterLabel: string | undefined = '';
  @Input() value: number | undefined = 0.0;
  @Input() type: string | undefined = '';
  valueClass: string | undefined = '';

  constructor() {}
  
  ngAfterViewInit(): void {
  }
}
