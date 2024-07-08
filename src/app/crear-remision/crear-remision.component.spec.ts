import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRemisionComponent } from './crear-remision.component';

describe('CrearRemisionComponent', () => {
  let component: CrearRemisionComponent;
  let fixture: ComponentFixture<CrearRemisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearRemisionComponent]
    });
    fixture = TestBed.createComponent(CrearRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
