import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNDropTableComponent } from './drag-n-drop-table.component';

describe('DragNDropTableComponent', () => {
  let component: DragNDropTableComponent;
  let fixture: ComponentFixture<DragNDropTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragNDropTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragNDropTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
