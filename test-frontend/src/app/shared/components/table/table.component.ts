import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ordering } from '@providers/data.service';

type TransformValue = 'million' | 'join';

export interface TableConfigColumn {
  field: string;
  title: string;
  orderingAvailable?: boolean;
  transformValue?: TransformValue;
  minWidth?: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public readonly DEFAULT_COLUMN_WIDTH = 150;

  @Input() public config: TableConfigColumn[];
  @Input() public rows: any[];
  @Input() public defaultOrderingColumn: string = 'name';
  @Output() public orderChange: EventEmitter<Ordering> = new EventEmitter();

  public ordering: Ordering = { field: 'name', order: 'ASC' };

  public sortBy(fieldName: string) {
    if (this.ordering.field === fieldName) {
      this.ordering.order = this.ordering.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.ordering.field = fieldName;
      this.ordering.order = 'ASC';
    }

    this.orderChange.emit(this.ordering);
  }
}
