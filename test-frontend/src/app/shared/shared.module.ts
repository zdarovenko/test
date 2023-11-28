import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from '@shared/components/switch/switch.component';
import { MillionPipe } from '@shared/pipes/million.pipe';
import { TableComponent } from '@shared/components/table/table.component';

@NgModule({
  declarations: [
    SwitchComponent,
     MillionPipe,
     TableComponent,
  ],
  exports: [
    SwitchComponent,
    MillionPipe,
    TableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
