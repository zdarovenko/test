import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CityResponse } from '@model/city';

export interface Ordering { field: string, order: 'ASC' | 'DESC' }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getData(ordering?: Ordering): Observable<CityResponse> {
    const params: { order_by?: string, ordering?: 'ASC' | 'DESC' } = {};

    if (ordering) {
      params.order_by = ordering.field;
      params.ordering = ordering.order;
    }

    return this.http.get<CityResponse>('http://localhost:3001/cities', { params });
  }
}
