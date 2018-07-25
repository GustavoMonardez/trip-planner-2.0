import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirApiTestingComponent } from './dir-api-testing.component';

describe('DirApiTestingComponent', () => {
  let component: DirApiTestingComponent;
  let fixture: ComponentFixture<DirApiTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirApiTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirApiTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
