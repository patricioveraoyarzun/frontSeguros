import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSalirComponent } from './modal-salir.component';

describe('ModalSalirComponent', () => {
  let component: ModalSalirComponent;
  let fixture: ComponentFixture<ModalSalirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSalirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSalirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
