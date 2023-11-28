import { Component, Input, Output, EventEmitter } from '@angular/core';

export type SwitchOptionValueType = string | number | boolean | null;
export interface SwitchOption {
  name: string;
  value: SwitchOptionValueType;
}

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {

  @Input() public options: SwitchOption[] = [];
  @Input() public value: SwitchOptionValueType = null;
  @Output() public valueChange: EventEmitter<SwitchOptionValueType> = new EventEmitter();

  public selectOption(value: SwitchOptionValueType): void {
    this.value = value;
    this.valueChange.emit(value)
  }
}
