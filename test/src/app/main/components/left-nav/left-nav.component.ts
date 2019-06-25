import { Component } from '@angular/core';
import { MainService } from '../../main.service';

// Компонент outlet'а левого меню

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent {

  // Объявление свойств класса

  // Модель имени создаваемого маркера
  placeMarkName: string;

  constructor(public base: MainService) {
    // Инициализация
    this.placeMarkName = '';
  }

  /**
   * Сохранение нового маркера
   * @param event
   */
  savePlaceMark(event) {
    // Проверка нажатой клавиши
    if (event.code !== 'Enter') {
      return;
    }
    if (!Boolean(this.placeMarkName)) {

      return;
    }

    this.base.addMarker(this.placeMarkName);
    this.placeMarkName = '';
  }

}
