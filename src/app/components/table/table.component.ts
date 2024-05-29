import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TableColumnData } from '../../interfaces/table-column-data';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { BaseServiceChild } from '../../interfaces/base-service-child';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DatePipe, DecimalPipe, CommonModule, FontAwesomeModule],
  providers: [DatePipe, DecimalPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements AfterViewInit {
  icons = {
    arrowRight: faArrowRight,
    arrowLeft: faArrowLeft,
    arrowUp: faArrowUp,
    arrowDown: faArrowDown,
  };

  @Input()
  service!: BaseServiceChild;

  data: any = [];
  displayData: any = [];
  page: number = 1;
  perPage: number = 25;

  gridData: any = {};

  sortIndex: number = -1;
  sortDirection: number = 1;

  @Input()
  columnData!: TableColumnData[];

  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe) {}

  async ngAfterViewInit() {
    this.search();
  }

  private async search() {
    let query: any = {
      expand: this.columnData
        .filter((i: any) => i.expand)
        .map((i: any) => i.key)
        .join(','),
    };

    if (this.sortIndex !== -1) {
      if (this.columnData[this.sortIndex].expand) {
        query.sort = `${this.sortDirection === 1 ? '' : '-'}${
          this.columnData[this.sortIndex].key
        }.${this.columnData[this.sortIndex].expand}`;
      } else {
        query.sort = `${this.sortDirection === 1 ? '' : '-'}${
          this.columnData[this.sortIndex].key
        }`;
      }
    }

    this.data = await this.service.getPaginated(this.page, this.perPage, query);
    this.data = this.data.items;

    this.gridData['grid-template-columns'] = '';
    this.columnData.forEach((column: TableColumnData) => {
      if (column.width)
        this.gridData['grid-template-columns'] += column.width / 100 + 'fr ';
      else this.gridData['grid-template-columns'] += '1fr ';
    });

    this.gridData['grid-template-rows'] = `50px ${
      this.data.length > 0 ? `repeat(${this.data.length}, 40px)` : 'auto'
    }`;

    this.generateDisplayData();
  }

  private generateDisplayData() {
    this.displayData = this.data.map((item: any) => {
      let displayItem: any = [];

      this.columnData.forEach((column: TableColumnData) => {
        let displayValue = column.expand
          ? item['expand'][column.key][column.expand]
          : item[column['key']];

        switch (column.format) {
          case 'value':
            displayValue =
              'R$' + this.decimalPipe.transform(displayValue, '1.2-2');
            break;
          case 'date':
            displayValue = this.datePipe.transform(displayValue, 'dd/MM/yyyy');
            break;
          case 'boolean':
            displayValue = displayValue ? 'Positive' : 'Negative';
            break;
        }

        displayItem.push(displayValue);
      });

      return displayItem;
    });
  }

  public async setPage(newPage: number) {
    if (newPage < 1) return;

    this.page = newPage;
    this.search();
  }

  public sortByColumn(index: number) {
    if (this.sortIndex === index) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortIndex = index;
      this.sortDirection = 1;
    }

    this.search();
  }
}
