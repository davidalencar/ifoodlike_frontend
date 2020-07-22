import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfdivisionComponent } from './shelfdivision.component';

describe('ShelfdivisionComponent', () => {
  let component: ShelfdivisionComponent;
  let fixture: ComponentFixture<ShelfdivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfdivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
