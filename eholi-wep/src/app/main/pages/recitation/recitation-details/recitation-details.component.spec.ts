import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecitationDetailsComponent } from './recitation-details.component';

describe('RecitationDetailsComponent', () => {
  let component: RecitationDetailsComponent;
  let fixture: ComponentFixture<RecitationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecitationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecitationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
