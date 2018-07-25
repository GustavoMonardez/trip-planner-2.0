import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsApiTestingComponent } from './js-api-testing.component';

describe('JsApiTestingComponent', () => {
  let component: JsApiTestingComponent;
  let fixture: ComponentFixture<JsApiTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsApiTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsApiTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
