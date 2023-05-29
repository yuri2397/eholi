import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLevelDeliberationResultatsComponent } from './class-level-deliberation-resultats.component';

describe('ClassLevelDeliberationResultatsComponent', () => {
  let component: ClassLevelDeliberationResultatsComponent;
  let fixture: ComponentFixture<ClassLevelDeliberationResultatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassLevelDeliberationResultatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassLevelDeliberationResultatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
