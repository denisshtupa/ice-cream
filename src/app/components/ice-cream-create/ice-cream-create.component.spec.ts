import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IceCreamCreateComponent } from './ice-cream-create.component';
import { IceCreamService } from 'src/app/services/ice-cream.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { CategoryEnum } from 'src/app/enums/category.enum';
import { SharedModule } from 'src/app/shared/shared.module';

describe('IceCreamCreateComponent', () => {
  let component: IceCreamCreateComponent;
  let fixture: ComponentFixture<IceCreamCreateComponent>;
  let iceCreamServiceMock: jasmine.SpyObj<IceCreamService>;
  let dialogRefMock: jasmine.SpyObj<DynamicDialogRef>;
  let configMock: jasmine.SpyObj<DynamicDialogConfig>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;
  const existingFlavorsNumber = 5; // Number of existing flavors from the fakeIceCreamData

  beforeEach(() => {
    const iceCreamServiceSpy = jasmine.createSpyObj('IceCreamService', ['addIceCreamFlavor']);
    const dialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    const configSpy = jasmine.createSpyObj('DynamicDialogConfig', [], { data: { existingFlavorsNumber } });
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [IceCreamCreateComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        FormBuilder,
        { provide: IceCreamService, useValue: iceCreamServiceSpy },
        { provide: DynamicDialogRef, useValue: dialogRefSpy },
        { provide: DynamicDialogConfig, useValue: configSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IceCreamCreateComponent);
    component = fixture.componentInstance;
    iceCreamServiceMock = TestBed.inject(IceCreamService) as jasmine.SpyObj<IceCreamService>;
    dialogRefMock = TestBed.inject(DynamicDialogRef) as jasmine.SpyObj<DynamicDialogRef>;
    configMock = TestBed.inject(DynamicDialogConfig) as jasmine.SpyObj<DynamicDialogConfig>;
    messageServiceMock = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the flavor form', () => {
    expect(component.flavorForm).toBeDefined();
    expect(component.categoryEnum).toEqual(Object.values(CategoryEnum));
  });

  it('should update validators for category "CreamIce"', () => {
    component.flavorForm.patchValue({ category: CategoryEnum.CreamIce });
    component.setValidatorsForCategory();

    const creamContentControl = component.flavorForm.get('creamContent');
    const fruitContentControl = component.flavorForm.get('fruitContent');
    const fruitsControl = component.flavorForm.get('fruits');
    const flavorsControl = component.flavorForm.get('flavors');

    expect(creamContentControl.validator).toBeTruthy();
    expect(fruitContentControl.validator).toBeNull();
    expect(fruitsControl.validator).toBeNull();
    expect(flavorsControl.validator).toBeNull();
  });

  it('should update validators for category "FruitIce"', () => {
    component.flavorForm.patchValue({ category: CategoryEnum.FruitIce });
    component.setValidatorsForCategory();

    const creamContentControl = component.flavorForm.get('creamContent');
    const fruitContentControl = component.flavorForm.get('fruitContent');
    const fruitsControl = component.flavorForm.get('fruits');
    const flavorsControl = component.flavorForm.get('flavors');

    expect(creamContentControl.validator).toBeNull();
    expect(fruitContentControl.validator).toBeTruthy();
    expect(fruitsControl.validator).toBeTruthy();
    expect(flavorsControl.validator).toBeNull();
  });

  it('should update validators for category "WaterIce"', () => {
    component.flavorForm.patchValue({ category: CategoryEnum.WaterIce });
    component.setValidatorsForCategory();

    const creamContentControl = component.flavorForm.get('creamContent');
    const fruitContentControl = component.flavorForm.get('fruitContent');
    const fruitsControl = component.flavorForm.get('fruits');
    const flavorsControl = component.flavorForm.get('flavors');

    expect(creamContentControl.validator).toBeNull();
    expect(fruitContentControl.validator).toBeNull();
    expect(fruitsControl.validator).toBeNull();
    expect(flavorsControl.validator).toBeTruthy();
  });

  it('should submit the form and add a new flavor', () => {
    const newFlavor = {
      id: 6,
      name: 'Mint Chocolate Chip',
      category: CategoryEnum.CreamIce,
      specifications: {
        id: 1,
        ingredients: ['Milk', 'Cream', 'Sugar', 'Mint Extract', 'Chocolate Chips'],
        foodIntolerances: 'Lactose',
        nutritionalValue: 220,
        buyingPrice: 2.0,
        sellingPrice: 4.5,
        creamContent: 30,
      },
    };
    component.flavorForm.patchValue({
      name: newFlavor.name,
      category: newFlavor.category,
      creamContent: newFlavor.specifications.creamContent,
      ingredients: newFlavor.specifications.ingredients.join(', '),
      foodIntolerances: newFlavor.specifications.foodIntolerances,
      nutritionalValue: newFlavor.specifications.nutritionalValue,
      buyingPrice: newFlavor.specifications.buyingPrice,
      sellingPrice: newFlavor.specifications.sellingPrice,
    });

    iceCreamServiceMock.addIceCreamFlavor.and.returnValue(of(undefined));

    component.onSubmit();
    expect(dialogRefMock.close).toHaveBeenCalled();
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      life: 4000,
      severity: 'success',
      summary: 'Success',
      detail: 'New flavor is just added.',
    });
  });

  it('should handle error when adding a flavor', () => {
    const newFlavor = {
      id: 6,
      name: 'Mint Chocolate Chip',
      category: CategoryEnum.CreamIce,
      specifications: {
        id: 1,
        ingredients: ['Milk', 'Cream', 'Sugar', 'Mint Extract', 'Chocolate Chips'],
        foodIntolerances: 'Lactose',
        nutritionalValue: 220,
        buyingPrice: 2.0,
        sellingPrice: 4.5,
        creamContent: 30,
      },
    };
    component.flavorForm.patchValue({
      name: newFlavor.name,
      category: newFlavor.category,
      creamContent: newFlavor.specifications.creamContent,
      ingredients: newFlavor.specifications.ingredients.join(', '),
      foodIntolerances: newFlavor.specifications.foodIntolerances,
      nutritionalValue: newFlavor.specifications.nutritionalValue,
      buyingPrice: newFlavor.specifications.buyingPrice,
      sellingPrice: newFlavor.specifications.sellingPrice,
    });

    const errorMessage = 'Flavor already exists';
    iceCreamServiceMock.addIceCreamFlavor.and.returnValue(throwError(() => errorMessage));

    component.onSubmit();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
    expect(messageServiceMock.add).toHaveBeenCalledWith({
      life: 4000,
      severity: 'error',
      summary: 'Failed',
      detail: errorMessage,
    });
  });
});
