import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceCreamCreateComponent } from './ice-cream-create.component';

describe('IceCreamCreateComponent', () => {
  let component: IceCreamCreateComponent;
  let fixture: ComponentFixture<IceCreamCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IceCreamCreateComponent]
    });
    fixture = TestBed.createComponent(IceCreamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
