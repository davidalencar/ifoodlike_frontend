import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfitemComponent } from './shelfitem.component';

describe('ShelfitemComponent', () => {
  let component: ShelfitemComponent;
  let fixture: ComponentFixture<ShelfitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
