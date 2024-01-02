import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XalxaComponent } from './xalxa.component';

describe('XalxaComponent', () => {
  let component: XalxaComponent;
  let fixture: ComponentFixture<XalxaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XalxaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XalxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
