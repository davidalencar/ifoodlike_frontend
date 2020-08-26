import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingComponent } from './picking.component';

describe('PickingComponent', () => {
  let component: PickingComponent;
  let fixture: ComponentFixture<PickingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
