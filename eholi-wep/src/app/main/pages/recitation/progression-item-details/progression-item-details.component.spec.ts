import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionItemDetailsComponent } from './progression-item-details.component';

describe('ProgressionItemDetailsComponent', () => {
  let component: ProgressionItemDetailsComponent;
  let fixture: ComponentFixture<ProgressionItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressionItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressionItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
