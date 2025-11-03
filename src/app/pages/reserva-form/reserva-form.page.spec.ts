import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaFormPage } from './reserva-form.page';

describe('ReservaFormPage', () => {
  let component: ReservaFormPage;
  let fixture: ComponentFixture<ReservaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
