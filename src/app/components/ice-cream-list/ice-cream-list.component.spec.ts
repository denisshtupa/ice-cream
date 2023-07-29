import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceCreamListComponent } from './ice-cream-list.component';

describe('IceCreamListComponent', () => {
  let component: IceCreamListComponent;
  let fixture: ComponentFixture<IceCreamListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IceCreamListComponent]
    });
    fixture = TestBed.createComponent(IceCreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
