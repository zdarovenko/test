import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subject, Subscription, switchMap } from 'rxjs';
import { City } from '@model/city';
import { DataService, Ordering } from '@providers/data.service';
import { SwitchOption, SwitchOptionValueType } from '@shared/components/switch/switch.component';
import { TableConfigColumn } from '@shared/components/table/table.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit, OnDestroy {
  public cities: City[] = [];
  public citiesSubscription: Subscription;
  public displayModeOptions: SwitchOption[] = [
    {
      name: 'Table',
      value: 'table',
    },
    {
      name: 'Cards',
      value: 'cards',
    },
  ]

  public displayMode: SwitchOptionValueType = 'cards';
  public applyFilters: Subject<Ordering> = new Subject();

  public tableConfig: TableConfigColumn[] = [
    {
      field: 'name',
      orderingAvailable: true,
      title: 'Name',
      minWidth: 120,
    },
    {
      field: 'name_native',
      orderingAvailable: true,
      title: 'Name native',
      minWidth: 130,
    },
    {
      field: 'country',
      orderingAvailable: true,
      title: 'Country',
      minWidth: 100,
    },
    {
      field: 'continent',
      orderingAvailable: true,
      title: 'Continent',
      minWidth: 120,
    },
    {
      field: 'latitude',
      title: 'Latitude',
      minWidth: 100,
    },
    {
      field: 'longitude',
      title: 'Longitude',
      minWidth: 100,
    },
    {
      field: 'population',
      orderingAvailable: true,
      transformValue: 'million',
      title: 'Population',
      minWidth: 120,
    },
    {
      field: 'founded',
      orderingAvailable: true,
      title: 'Founded in',
      minWidth: 110,
    },
    {
      field: 'landmarks',
      transformValue: 'join',
      title: 'Landmarks',
    },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit() {
     this.citiesSubscription = this.applyFilters
      .pipe(
        switchMap((ordering) => this.dataService.getData(ordering)),
        map((response) => response.cities)
      ).subscribe((cities) => { this.cities = cities; });

     this.applyFilters.next({ field: 'name', order: 'ASC' });
  }

  ngOnDestroy() {
    this.citiesSubscription?.unsubscribe();
  }
}
