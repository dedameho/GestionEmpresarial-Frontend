import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemisionesComponent } from './remisiones.component';

describe('RemisionesComponent', () => {
  let component: RemisionesComponent;
  let fixture: ComponentFixture<RemisionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemisionesComponent]
    });
    fixture = TestBed.createComponent(RemisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
