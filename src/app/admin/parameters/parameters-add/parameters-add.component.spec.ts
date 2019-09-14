import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersAddComponent } from './parameters-add.component';

describe('ParametersAddComponent', () => {
  let component: ParametersAddComponent;
  let fixture: ComponentFixture<ParametersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
