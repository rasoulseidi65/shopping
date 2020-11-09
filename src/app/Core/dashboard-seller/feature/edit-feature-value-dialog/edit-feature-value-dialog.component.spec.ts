import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatureValueDialogComponent } from './edit-feature-value-dialog.component';

describe('EditFeatureValueDialogComponent', () => {
  let component: EditFeatureValueDialogComponent;
  let fixture: ComponentFixture<EditFeatureValueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFeatureValueDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeatureValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
