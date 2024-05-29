import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { TransactionService } from '../../services/transaction/transaction.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { FinanceStatCardComponent } from '../../components/finance-stat-card/finance-stat-card.component';
import { AccountsService } from '../../services/accounts/accounts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgxEchartsModule,
    DatePipe,
    FontAwesomeModule,
    FormsModule,
    DecimalPipe,
    FinanceStatCardComponent,
    CommonModule,
  ],
  providers: [DatePipe, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  icons = {
    faMagnifyingGlass,
  };

  filter: {
    startDate: string | undefined;
    endDate: string | undefined;
    account: string | undefined;
  } = {
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    account: '',
  };
  filterLabel: string | undefined = '';

  transactions: any = [];
  income: any = [];
  expenses: any = [];
  accounts: any = [];
  accountsOptions: any = [];

  totalIncome: number = 0.0;
  totalExpenses: number = 0.0;
  remaining: number = 0.0;

  pieData: any = [];
  pieMergeOptions: echarts.EChartsOption = {};

  transactionChartData: any = [];
  transactionChartMergeOptions: echarts.EChartsOption = {};

  lineGraphOptions: echarts.EChartsOption = {
    title: {
      text: 'Income and Expenses',
      subtext: this.filterLabel,
    },
    legend: {
      align: 'left',
      data: ['Income', 'Expenses', 'Remaining'],
      top: '6.5%',
      selected: {
        Income: true,
        Expenses: true,
        Remaining: false,
      },
      selector: ['all'],
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    series: [
      {
        name: 'Income',
        color: '#5cb85c',
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(92, 184, 92)',
            },
            {
              offset: 1,
              color: 'rgb(92, 184, 92, 0)',
            },
          ]),
        },
        label: {
          show: false,
          formatter: (obj: any) => {
            return obj.value > 0
              ? 'R$' + this.decimalPipe.transform(obj.value, '1.2-2')
              : '';
          },
          position: 'top',
        },
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'Expenses',
        color: '#d9534f',
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(217, 83, 79)',
            },
            {
              offset: 1,
              color: 'rgb(217, 83, 79, 0)',
            },
          ]),
        },
        label: {
          formatter: (obj: any) => {
            return obj.value > 0
              ? 'R$' + this.decimalPipe.transform(obj.value, '1.2-2')
              : '';
          },
          show: false,
          position: 'top',
        },
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'Remaining',
        color: '#ebcc34',
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(242, 213, 70)',
            },
            {
              offset: 1,
              color: 'rgb(242, 213, 70, 0)',
            },
          ]),
        },
        data: [],
        type: 'line',
        smooth: true,
      },
    ],
  };

  pieGraphOptions: echarts.EChartsOption = {
    title: {
      text: 'Expenses by category',
      subtext: 'Last 30 days',
    },
    tooltip: {
      trigger: 'item',
      formatter: (obj: any) => {
        return `${obj.name}<br>R$${this.decimalPipe.transform(
          obj.value,
          '1.2-2'
        )}`;
      },
    },
    legend: {
      top: '10%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
  };

  constructor(
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private accountsService: AccountsService
  ) {}

  async ngOnInit() {
    let resultAccounts = await this.accountsService.get();
    this.accounts = resultAccounts;
    this.accountsOptions = this.accounts.map((a: any) => {
      return {
        label: a.name,
        value: a.id,
      };
    });

    this.updateCharts();
  }

  public async generateRandom() {
    let types = [
      'l4ytgx6wel8z725',
      'whcqswtxo9mub34',
      '6dn77w812459tru',
      'lw2x9u4pu4qdzy8',
      'l4ytgx6wel8z725',
      '6dn77w812459tru',
      'lw2x9u4pu4qdzy8',
      '733je96mvx1j1ga',
    ];

    let randomTransactions = [];

    for (let i = 0; i < 600; i++) {
      let selectedType = types[Math.floor(Math.random() * types.length)];

      let endDate = new Date('2024-12-30');
      let startDate = new Date('2024-01-02');

      let endValue = endDate.getTime();
      let startValue = startDate.getTime();

      let r = Math.random() * (endValue - startValue) + startValue;

      let newDate = new Date(startValue + r);
      newDate.setFullYear(2024);

      randomTransactions.push({
        date: newDate.toISOString().replace('T', ' ').replace('Z', ''),
        type: selectedType,
        value:
          selectedType == '733je96mvx1j1ga'
            ? parseFloat((Math.random() * (400 - 100) + 100).toFixed(2))
            : parseFloat((Math.random() * (150 - 10) + 10).toFixed(2)),
        account: 'fbmnb4jtsjm050k',
      });
    }

    let aux = [];

    for (let i = 1; i <= 12; i++) {
      let salaryPersonalTransaction = {
        date: `2024-${i.toString().padStart(2, '0')}-05 00:00:00`,
        type: 'jsfp2brg066711u',
        value: 1431.64,
        account: 'fbmnb4jtsjm050k',
      };

      let salarySavingsTransaction = {
        date: `2024-${i.toString().padStart(2, '0')}-05 00:00:00`,
        type: 'jsfp2brg066711u',
        value: 1000.0,
        account: 'vojbk34sf7y62mx',
      };

      randomTransactions.push(
        salaryPersonalTransaction,
        salarySavingsTransaction
      );

      aux.push(salaryPersonalTransaction, salarySavingsTransaction);
    }

    for (let i = 0; i < randomTransactions.length; i++) {
      await this.transactionService.create(randomTransactions[i]);
    }

    this.updateCharts();
  }

  public async deleteAll() {
    let r: any = await this.transactionService.get();

    r.forEach(async (t: any) => {
      await this.transactionService.delete(t.id);
    });

    this.updateCharts();
  }

  public async updateCharts() {
    // Get Transactions
    let queryFilter = [];
    if (this.filter.startDate)
      queryFilter.push(`date >= '${this.filter.startDate} 00:00:00'`);
    if (this.filter.endDate)
      queryFilter.push(`date <= '${this.filter.endDate} 23:59:59'`);
    if (this.filter.account !== '')
      queryFilter.push(`account="${this.filter.account}"`);

    let options: any = {
      expand: 'type',
    };
    if (queryFilter.length > 0) {
      options['filter'] = queryFilter.join(' && ');
    }

    let result: any = await this.transactionService.get(options);
    this.transactions = result;
    this.income = this.transactions.filter((t: any) => t.expand.type.add);
    this.expenses = this.transactions.filter((t: any) => !t.expand.type.add);

    // Update Expenses Pie Graph
    let pieDataGrouped: any = this.expenses.reduce((r: any, a: any) => {
      r[a.expand.type.id] = r[a.expand.type.id] || [];
      r[a.expand.type.id].push(a);
      return r;
    }, Object.create(null));

    let data = [];
    for (let key of Object.keys(pieDataGrouped)) {
      let type = pieDataGrouped[key];
      let total = type.reduce((a: any, b: any) => a + b.value, 0);
      data.push({
        value: total,
        name: type[0].expand.type.description,
      });
    }

    this.pieData = data;

    this.pieMergeOptions = {
      title: {
        subtext: this.filterLabel,
      },
      series: [
        {
          data: this.pieData,
        },
      ],
    };

    // Update Income and Expenses Line Graph
    let incomeData = this.income.reduce((r: any, a: any) => {
      let formattedDate = this.datePipe.transform(a.date, 'yyyy-MM-dd') || '';

      r[formattedDate] = r[formattedDate] || [];
      r[formattedDate].push(a);
      return r;
    }, {});

    let expensesData = this.expenses.reduce((r: any, a: any) => {
      let formattedDate = this.datePipe.transform(a.date, 'yyyy-MM-dd') || '';

      r[formattedDate] = r[formattedDate] || [];
      r[formattedDate].push(a);
      return r;
    }, {});

    let filteredDates: any[] = this.getDateInterval();

    let filteredIncome: any[] = filteredDates.map((d: string) => {
      let total = incomeData[d]
        ? incomeData[d].reduce((a: any, b: any) => a + b.value, 0)
        : 0;

      return total;
    });
    filteredIncome = filteredIncome.map((v: any) => {
      return parseFloat(v.toFixed(2));
    });

    let filteredExpenses: any[] = filteredDates.map((d: string) => {
      let total = expensesData[d]
        ? expensesData[d].reduce((a: any, b: any) => a + b.value, 0)
        : 0;

      return total;
    });
    filteredExpenses = filteredExpenses.map((v: any) => {
      return parseFloat(v.toFixed(2));
    });

    let totalIncome = 0;
    let filteredRemaining: any[] = [];
    filteredIncome.forEach((i: any, index: number) => {
      totalIncome += i;
      filteredRemaining[index] = totalIncome;
    });

    let totalExpenses = 0;
    filteredExpenses.forEach((i: any, index: number) => {
      totalExpenses += i;
      filteredRemaining[index] -= totalExpenses;
    });
    filteredRemaining = filteredRemaining.map((v: any) =>
      parseFloat(v.toFixed(2))
    );

    this.transactionChartData = [
      {
        name: 'Income',
        data: filteredIncome,
      },
      {
        name: 'Expenses',
        data: filteredExpenses,
      },
      {
        name: 'Remaining',
        data: filteredRemaining,
      },
    ];

    this.transactionChartMergeOptions = {
      title: {
        subtext: this.filterLabel,
      },
      xAxis: {
        data: filteredDates.map((i) => {
          return this.datePipe.transform(i, 'dd/MM/yyyy') || '';
        }),
      },
      series: this.transactionChartData,
    };

    // Update Total Income, Expenses and Remaining
    this.totalIncome = this.income.reduce(
      (a: any, b: any) => a + parseFloat(b.value),
      0.0
    );
    this.totalExpenses = this.expenses.reduce(
      (a: any, b: any) => a + parseFloat(b.value),
      0.0
    );
    this.remaining = this.totalIncome - this.totalExpenses;
  }

  updateFilterLabel() {
    this.filterLabel =
      this.filter.startDate || this.filter.endDate
        ? this.filter.endDate === undefined
          ? `${this.datePipe.transform(
              this.filter.startDate,
              'dd/MM/yyyy'
            )} - Today`
          : this.filter.startDate === undefined
          ? `Start - ${this.datePipe.transform(
              this.filter.endDate?.toString(),
              'dd/MM/yyyy'
            )}`
          : `${this.datePipe.transform(
              this.filter.startDate,
              'dd/MM/yyyy'
            )} - ${this.datePipe.transform(
              this.filter.endDate?.toString(),
              'dd/MM/yyyy'
            )}`
        : '';

    if (this.filter.account !== '') {
      this.filterLabel +=
        this.filterLabel !== ''
          ? ' | ' +
            this.accounts.find((ac: any) => ac.id == this.filter.account).name
          : '' +
            this.accounts.find((ac: any) => ac.id == this.filter.account).name;
    }

    this.updateCharts();
  }

  public reset() {
    this.filter = {
      startDate: undefined,
      endDate: undefined,
      account: '',
    };
    this.updateFilterLabel();
  }

  public getDatesFromLast30Days() {
    const today = new Date();

    let dates = [];
    for (let i = 0; i < 30; i++) {
      let date: Date | string = new Date(today);
      date.setDate(date.getDate() - 29 + i);
      date.setHours(0, 0, 0, 0);
      date = this.datePipe.transform(date, 'yyyy-MM-dd') || '';
      dates.push(date);
    }

    return dates;
  }

  public getDateInterval() {
    let transactionDates = [
      ...new Set(
        this.transactions.map((t: any) => t.date.toString().split(' ')[0])
      ),
    ].sort();

    let startDate =
      this.filter.startDate === undefined
        ? transactionDates[0]
        : this.filter.startDate;
    startDate = new Date(startDate as string);
    (startDate as Date).setDate((startDate as Date).getDate() + 1);

    let endDate =
      this.filter.endDate === undefined
        ? transactionDates[transactionDates.length - 1]
        : this.filter.endDate;
    endDate = new Date(endDate as string);
    (endDate as Date).setDate((endDate as Date).getDate() + 1);

    let arr = [];
    for (
      const dt = startDate as Date;
      dt <= (endDate as Date);
      dt.setDate(dt.getDate() + 1)
    ) {
      dt.setHours(12, 0, 0, 0);
      arr.push(new Date(dt));
    }

    arr = arr.map((d: any) => {
      return this.datePipe.transform(d, 'yyyy-MM-dd') || '';
    });

    return arr;
  }
}
