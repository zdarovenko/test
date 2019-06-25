/// <reference path="../ymaps.d.ts" />

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forEach as _forEach, map as _map, sortBy as _sortBy, find as _find, reject as _reject } from 'lodash/fp';

// Сервис для связывания outlet'ов левого меню и контента между собой

// Описание ползовательских интерфейсов

// Интерфейс маркера
export interface Marker {
  // Название
  name: string;
  // Порядковый номер для построения ломаной
  order: number;
  // Уникальный идентификатор
  id: number;
  // Координаты
  coordinates: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MainService implements Resolve<void> {

  // Объявление свойств класса

  // Экземпляр карты
  map: ymaps.Map;
  // Коллекция маркеров
  markers: Marker[];
  // Экземпляр ломаной, соединяющей маркеры на карте
  polyline: ymaps.Polyline;
  // Счетчик для присвоения уникальных id маркерам
  idCounter: number;

  constructor() {
    // Инициализация коллекции маркеров и счетчика
    this.markers = [];
    this.idCounter = 1;
  }

  /**
   * Инициализация карты при резолве rout'а
   */
  resolve(): void {
    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        // Центр карты
        center: [50.450100, 30.523400],
        // Масштаб
        zoom: 15,
        // Пресет элементов управления
        controls: ['smallMapDefaultSet']
      });
    });
  }

  /**
   * Обработчик события окончания перетаскивания маркера на карте
   * @param placemark
   */
  dragEndHandler(placemark: ymaps.Placemark): void {
    // Поиск маркера из коллекции по id и обновление его свойств
    const id = placemark.properties.get('id');
    const marker = _find<Marker>({id})(this.markers);
    marker.coordinates = placemark.geometry.getCoordinates();

    // Обновление ломаной
    this.updatePolyline();
  }

  /**
   * Добавление маркера
   * @param name
   */
  addMarker(name: string): void {
    const payload: Marker = {
      name,
      order: this.markers.length,
      // Новый маркер создается в центре карты
      coordinates: this.map.getCenter(),
      id: this.idCounter
    };
    this.idCounter++;
    this.markers.push(payload);
    // Обновление ссылки на массив, чтобы дочерний компонент подхватил измененный массив через @Input
    this.markers = _map((marker) => {
      return marker;
    })(this.markers);

    // Создание экземпляра маркера (для возможности перетаскивания нужно установить draggable: true в параметре properties конструктора)
    // balloonContent в options - содержимое балуна, который открывается при клике по маркеру на карте
    const placemark = new ymaps.Placemark(payload.coordinates, {
      balloonContent: payload.name
    }, { draggable: true });
    placemark.properties.set('id', payload.id);
    placemark.properties.set('order', payload.order);
    // Назначение обработчика на окончание перетаскивания маркера на карте
    placemark.events.add('dragend', () => {
      this.dragEndHandler(placemark);
    });
    // Добавление маркера на карту
    this.map.geoObjects.add(placemark);
    // Обновление ломаной
    this.updatePolyline();
  }

  /**
   * Обновление карты
   */
  updateMap(): void {
    // Приведение к актуальному соответствию полей order маркеров на карте и маркеров коллекции
    this.markers = _sortBy('order')(this.markers);
    _forEach((marker) => {
      this.map.geoObjects.each((item) => {
        if (item.properties.get('id') === marker.id) {
          item.properties.set('order', marker.order);
        }
      });
    })(this.markers);
    // Обновление ломаной
    this.updatePolyline();
  }

  /**
   * Обновление ломаной
   */
  updatePolyline(): void {
    // Удаление старой ломаной и создание новой по актуальным координатам маркеров
    this.map.geoObjects.remove(this.polyline);
    const lineCoords = _map('coordinates')(this.markers);
    this.polyline = new ymaps.Polyline(lineCoords);
    this.map.geoObjects.add(this.polyline);
  }

  /**
   * Удаление маркера
   * @param id
   */
  removeMarker(id: number): void {
    // Поиск маркера по id и его удаление
    let placemark: ymaps.Placemark;
    this.map.geoObjects.each((item) => {
      if (item.properties.get('id') === id) {
        placemark = item;
      }
    });
    this.map.geoObjects.remove(placemark);
    this.markers = _reject((marker) => {
      return id === marker.id;
    })(this.markers);
    // Обновление карты
    this.updateMap();
  }
}
