export interface TableColumnData {
  header: string;
  key: string;
  expand?: string;
  format?: 'date' | 'value';
  width?: number;
}
