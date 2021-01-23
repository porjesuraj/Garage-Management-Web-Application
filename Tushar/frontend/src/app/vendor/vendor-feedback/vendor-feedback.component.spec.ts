import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFeedbackComponent } from './vendor-feedback.component';

describe('VendorFeedbackComponent', () => {
  let component: VendorFeedbackComponent;
  let fixture: ComponentFixture<VendorFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
