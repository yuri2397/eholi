import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachSourahToStudentComponent } from './attach-sourah-to-student.component';

describe('AttachSourahToStudentComponent', () => {
  let component: AttachSourahToStudentComponent;
  let fixture: ComponentFixture<AttachSourahToStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachSourahToStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachSourahToStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
