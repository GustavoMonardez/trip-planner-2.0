import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetripComponent } from './createtrip.component';

describe('CreatetripComponent', () => {
  let component: CreatetripComponent;
  let fixture: ComponentFixture<CreatetripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
