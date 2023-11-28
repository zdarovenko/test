export interface City {
  name: string;
  name_native: string;
  country: string;
  continent: string;
  latitude: number;
  longitude: number;
  population: number;
  founded: number;
  landmarks: string[];
}

export interface CityResponse {
  cities: City[];
}
