/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MudancaTarifariaComponent } from './mudanca-tarifaria.component';

describe('MudancaTarifariaComponent', () => {
  let component: MudancaTarifariaComponent;
  let fixture: ComponentFixture<MudancaTarifariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MudancaTarifariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MudancaTarifariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
