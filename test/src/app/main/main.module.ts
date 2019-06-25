import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { ContentComponent } from './components/content/content.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { DragNDropTableComponent } from './components/drag-n-drop-table/drag-n-drop-table.component';

// Основной модуль

@NgModule({
  declarations: [
    LayoutComponent,
    ContentComponent,
    LeftNavComponent,
    DragNDropTableComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
