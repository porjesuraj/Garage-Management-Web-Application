import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirenowComponent } from './enquirenow.component';

describe('EnquirenowComponent', () => {
  let component: EnquirenowComponent;
  let fixture: ComponentFixture<EnquirenowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirenowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirenowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
