import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IceCreamListComponent } from './ice-cream-list.component';
import { CategoryEnum } from 'src/app/enums/category.enum';
import { IceCreamService } from 'src/app/services/ice-cream.service';
import { DialogService } from 'primeng/dynamicdialog';
import { IceCreamCreateComponent } from '../ice-cream-create/ice-cream-create.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { fakeIceCreamData } from 'src/app/shared/constants';
import { TagModule } from 'primeng/tag';

describe('IceCreamListComponent', () => {
  let component: IceCreamListComponent;
  let fixture: ComponentFixture<IceCreamListComponent>;
  let mockIceCreamService: jasmine.SpyObj<IceCreamService>;
  let mockDialogService: jasmine.SpyObj<DialogService>;

  beforeEach(() => {
    mockIceCreamService = jasmine.createSpyObj('IceCreamService', ['getAllIceCreamFlavors']);
    mockDialogService = jasmine.createSpyObj('DialogService', ['open']);

    TestBed.configureTestingModule({
      declarations: [IceCreamListComponent],
      providers: [
        { provide: IceCreamService, useValue: mockIceCreamService },
        { provide: DialogService, useValue: mockDialogService },
      ],
      imports: [
        ButtonModule,
        TableModule,
        TagModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IceCreamListComponent);
    component = fixture.componentInstance;
    mockIceCreamService.getAllIceCreamFlavors.and.returnValue(fakeIceCreamData);
    fixture.detectChanges();
  });

  it('should fetch ice cream flavors from the service on initialization', () => {
    expect(mockIceCreamService.getAllIceCreamFlavors).toHaveBeenCalled();
    expect(component.iceCreamFlavors).toEqual(fakeIceCreamData);
  });

  it('should return correct category color', () => {
    expect(component.getCategorySeverity(CategoryEnum.CreamIce)).toBe('danger');
    expect(component.getCategorySeverity(CategoryEnum.FruitIce)).toBe('success');
    expect(component.getCategorySeverity(CategoryEnum.WaterIce)).toBe('info');
  });

  it('should open the "Add new sort of ice cream" modal', () => {
    const expectedWidth = window.innerWidth < 768 ? '90%' : '60%';
    const expectedHeight = '80%';

    component.showAddFlavorModal();

    expect(mockDialogService.open).toHaveBeenCalledWith(IceCreamCreateComponent, {
      header: 'Add new sort of ice cream',
      width: expectedWidth,
      height: expectedHeight,
      data: { existingFlavorsNumber: fakeIceCreamData.length }
    });
  });
});
