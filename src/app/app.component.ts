import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { NgxEchartsModule, provideEcharts } from 'ngx-echarts';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidemenuComponent,
    NgxEchartsModule,
    DecimalPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideEcharts(), DecimalPipe],
})
export class AppComponent {
  title = 'personalFinanceFrotend';
}
