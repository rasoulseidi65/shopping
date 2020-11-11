import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFeatureComponent } from './add-product-feature.component';

describe('AddProductFeatureComponent', () => {
  let component: AddProductFeatureComponent;
  let fixture: ComponentFixture<AddProductFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
