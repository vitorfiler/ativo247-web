import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFinalComponent } from './login-final.component';

describe('LoginFinalComponent', () => {
  let component: LoginFinalComponent;
  let fixture: ComponentFixture<LoginFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
