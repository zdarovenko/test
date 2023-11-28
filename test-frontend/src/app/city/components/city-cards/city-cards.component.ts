import { Component, Input, OnInit } from '@angular/core';
import { City } from '@model/city';

interface Expandable {
  expanded?: boolean;
}

@Component({
  selector: 'app-city-cards',
  templateUrl: './city-cards.component.html',
  styleUrls: ['./city-cards.component.scss']
})
export class CityCardsComponent implements OnInit {
  @Input() public cities: Array<City & Expandable> = [];

  public expandedIndex: number = -1;

  ngOnInit() {
    this.cities.forEach((city) => { city.expanded = false; });
  }
}
