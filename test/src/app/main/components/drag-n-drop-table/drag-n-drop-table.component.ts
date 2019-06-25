import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { sortBy as _sortBy } from 'lodash/fp';
import { Marker } from '../../main.service';

// Компонент таблицы маркеров с возможностью drag&drop'а элементов

@Component({
  selector: 'app-drag-n-drop-table',
  templateUrl: './drag-n-drop-table.component.html',
  styleUrls: ['./drag-n-drop-table.component.scss']
})
export class DragNDropTableComponent implements OnInit {

  // Описание связей с родительским компонентом

  // Коллекция, с которой производится работа
  @Input() collection: Marker[];
  // Событие, испускаемое в область видимости родительского компонента при окончании drag&drop'а
  @Output() dragNDropEnd: EventEmitter<any> = new EventEmitter<any>();
  // Событие, испускаемое в область видимости родительского компонента при удалении элемента коллекции
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  // Описание свойств класса

  // Подписки на события drag&drop'а
  dragStartSubscription: Subscription;
  dragEndSubscription: Subscription;
  dragOverSubscription: Subscription;
  dragEnterSubscription: Subscription;
  dragDropSubscription: Subscription;
  // Коллекция контейнеров для элементов таблицы
  cells: HTMLCollection;
  // Вспомогательные значения для правильного выстраивания порядка элементов коллекции
  dragStartIndex: number;
  dragEndIndex: number;

  // Инициализация и подписка на события
  ngOnInit(): void {
    const table = document.getElementById('table');
    this.cells = document.getElementsByClassName('cell');
    this.dragStartSubscription = fromEvent(table, 'dragstart')
      .subscribe((e: Event) => {
        setTimeout(() => {
          // @ts-ignore
          e.target.className = 'invisible';
        }, 0);
        // @ts-ignore
        this.dragStartIndex = Number(e.target.getAttribute('item-index'));
      });

    this.dragEndSubscription = fromEvent(table, 'dragend')
      .subscribe((e) => {
        // @ts-ignore
        e.target.className = 'marker';
      });

    this.dragOverSubscription = fromEvent(table, 'dragover')
      .subscribe((e) => {
        e.preventDefault();
      });

    this.dragEnterSubscription = fromEvent(table, 'dragenter')
      .subscribe((e) => {
        e.preventDefault();
      });

    this.dragDropSubscription = fromEvent(table, 'drop')
      .subscribe((e) => {
        // @ts-ignore
        if (e.target.className === 'cell' || e.target.className === 'marker' || e.target.className === 'marker-span' || e.target.className === 'delete') {
          // @ts-ignore
          this.dragEndIndex = Number(e.target.getAttribute('item-index'));
          this.collection = this.sortCollection();
          this.dragNDropEnd.emit();
        }
      });
  }

  /**
   * Сортировка коллекции
   */
  sortCollection(): Marker[] {
    if (this.dragStartIndex === this.dragEndIndex) {
      return this.collection;
    }

    if (this.dragStartIndex < this.dragEndIndex) {
      for (let i = this.dragStartIndex + 1; i <= this.dragEndIndex; i++) {
        this.collection[i].order = this.collection[i].order - 1;
      }
      this.collection[this.dragStartIndex].order = this.dragEndIndex;
    }

    if (this.dragStartIndex > this.dragEndIndex) {
      for (let i = this.dragEndIndex; i <= this.dragStartIndex - 1; i++) {
        this.collection[i].order = this.collection[i].order + 1;
      }
      this.collection[this.dragStartIndex].order = this.dragEndIndex;
    }

    return _sortBy('order')(this.collection);
  }

  /**
   * Испускание события удаления маркера в область видимости родительского компонента
   * @param item
   */
  removeMarker(item: Marker): void {
    this.remove.emit(item.id);
  }
}
