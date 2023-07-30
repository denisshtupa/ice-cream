import { IceCreamService } from './ice-cream.service';
import { fakeIceCreamData } from '../shared/constants';
import { CategoryEnum } from '../enums/category.enum';
import { IIceCreamFlavor } from '../interfaces/ice-cream.interface';

describe('IceCreamService', () => {
  let iceCreamService: IceCreamService;

  beforeEach(() => {
    // Create a new instance of the service
    iceCreamService = new IceCreamService();
  });


  // Test for the getAllIceCreamFlavors method
  it('should return all ice cream flavors', () => {
    const allFlavors = iceCreamService.getAllIceCreamFlavors();

    expect(allFlavors.length).toBe(fakeIceCreamData.length);
    expect(allFlavors).toEqual(fakeIceCreamData);
  });

  // Test for the addIceCreamFlavor method
  it('should add a new ice cream flavor', (done: DoneFn) => {
    const newFlavor: IIceCreamFlavor = {
      id: 6,
      name: 'Blueberry',
      category: CategoryEnum.FruitIce,
      specifications: {
        id: 1,
        ingredients: ['Milk', 'Cream', 'Sugar', 'Blueberries'],
        foodIntolerances: 'Lactose',
        nutritionalValue: 170,
        buyingPrice: 2.0,
        sellingPrice: 4.5,
        fruitContent: 30,
        fruits: ['blueberry'],
      },
    };

    iceCreamService.addIceCreamFlavor(newFlavor).subscribe(() => {
      const allFlavors = iceCreamService.getAllIceCreamFlavors();

      expect(allFlavors.length).toBe(fakeIceCreamData.length);
      expect(allFlavors).toContain(newFlavor);
      done();
    });
  });

  // Test for the addIceCreamFlavor method with existing flavor
  it('should not add an existing ice cream flavor', (done: DoneFn) => {
    const existingFlavor: IIceCreamFlavor = {
      id: 1,
      name: 'Vanilla',
      category: CategoryEnum.CreamIce,
      specifications: {
        id: 1,
        ingredients: ['Milk', 'Cream', 'Sugar', 'Vanilla Extract'],
        foodIntolerances: 'Lactose',
        nutritionalValue: 150,
        buyingPrice: 1.5,
        sellingPrice: 3.0,
        creamContent: 20,
      },
    };

    iceCreamService.addIceCreamFlavor(existingFlavor).subscribe({
      next: () => {
        // This should not be called because an error is expected
        done.fail('Expected an error, but got success.');
      },
      error: (error) => {
        expect(error.message).toBe('Flavor already exists');
        done();
      }
    })
  });
});
