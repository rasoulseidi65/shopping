import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatureDialogComponent } from './edit-feature-dialog.component';

describe('EditFeatureDialogComponent', () => {
  let component: EditFeatureDialogComponent;
  let fixture: ComponentFixture<EditFeatureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFeatureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
