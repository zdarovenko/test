import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from '@city/city.component';
import { CityRoutingModule } from '@city/city-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CityCardsComponent } from '@city/components/city-cards/city-cards.component';

@NgModule({
  declarations: [
    CityComponent,
    CityCardsComponent,
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule
  ]
})
export class CityModule { }
