import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadMetasComponent } from './cad-metas.component';

describe('CadMetasComponent', () => {
  let component: CadMetasComponent;
  let fixture: ComponentFixture<CadMetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadMetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
