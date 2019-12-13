import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendenPopupComponent } from './spenden-popup.component';

describe('SpendenPopupComponent', () => {
  let component: SpendenPopupComponent;
  let fixture: ComponentFixture<SpendenPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendenPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
