declare namespace ymaps {
  export function ready(): Promise;

  class Promise {
    then(onFulfilled?: Function, onRejected?: Function, onProgress?: Function, ctx?: any): Promise;
  }

  export class Polyline {
    constructor(coordinatesArray: Array<number[]>);
  }

  export class Map {
    constructor(element: string | any, state: MapState);

    geoObjects: GeoObjects;
    getCenter(): number[];
  }

  export class GeoObjects {
    add(item: Placemark | Polyline);
    each(handler: Function);
    remove(element: Placemark | Polyline);
  }

  export class Geometry {
    getCoordinates(): number[];
  }

  export class MapState {
    center: number[];
    controls: string[];
    zoom: number;
  }

  export class PlacemarkOptions {
    balloonContent: string;
  }

  export class PlacemarkProperties {
    draggable: boolean;
  }

  export class PlacemarkEvents {
    add(name: string, handler: Function);
  }

  export class PlacemarkProperty {
    set(name: string, value: any);
    get(name: string);
  }

  export class Placemark {
    constructor(coordinates: number[], options: PlacemarkOptions, properties: PlacemarkProperties);

    events: PlacemarkEvents;
    properties: PlacemarkProperty;
    geometry: Geometry;
  }
}
