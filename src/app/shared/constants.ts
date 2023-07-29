import { CategoryEnum } from "../enums/category.enum";
import { IIceCreamFlavor } from "../interfaces/ice-cream.interface";

export const fakeIceCreamData: IIceCreamFlavor[] = [
  {
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
      // Cream ice cream specific property
      creamContent: 20,
    },
  },
  {
    id: 2,
    name: 'Strawberry',
    category: CategoryEnum.FruitIce,
    specifications: {
      id: 1,
      ingredients: ['Milk', 'Cream', 'Sugar', 'Strawberries'],
      foodIntolerances: 'Lactose',
      nutritionalValue: 180,
      buyingPrice: 2.0,
      sellingPrice: 4.0,
      // Fruit ice cream specific property
      fruitContent: 25,
      fruits: ['strawberry', 'mango'],
    },
  },
  {
    id: 3,
    name: 'Chocolate',
    category: CategoryEnum.CreamIce,
    specifications: {
      id: 1,
      ingredients: ['Milk', 'Cream', 'Sugar', 'Cocoa Powder'],
      foodIntolerances: 'Lactose, Gluten',
      nutritionalValue: 200,
      buyingPrice: 2.5,
      sellingPrice: 5.0,
      // Cream ice cream specific property
      creamContent: 25,
    },
  },
  {
    id: 4,
    name: 'Mango Sorbet',
    category: CategoryEnum.WaterIce,
    specifications: {
      id: 1,
      ingredients: ['Water', 'Sugar', 'Mango Pulp'],
      foodIntolerances: 'None',
      nutritionalValue: 120,
      buyingPrice: 1.0,
      sellingPrice: 3.0,
      // Water ice cream specific property
      flavors: ['Mango'],
    },
  },
  {
    id: 5,
    name: 'Pistachio',
    category: CategoryEnum.CreamIce,
    specifications: {
      id: 1,
      ingredients: ['Milk', 'Cream', 'Sugar', 'Pistachio Nuts'],
      foodIntolerances: 'Lactose, Nuts',
      nutritionalValue: 190,
      buyingPrice: 3.0,
      sellingPrice: 6.0,
      // Cream ice cream specific property
      creamContent: 18,
    },
  },
];

export const availableFruits: string[] = [
  'Apple',
  'Banana',
  'Cherry',
  'Orange',
  'Strawberry',
  'Mango',
  'Pineapple',
  'Kiwi',
  'Grapes',
  'Watermelon',
  'Blueberry',
  'Raspberry',
  'Blackberry',
  'Peach',
  'Pear',
  'Plum',
  'Mango',
  'Lemon',
  'Lime',
  'Coconut',
  'Guava',
  'Papaya',
  'Cantaloupe',
  'Honeydew',
  'Passion Fruit',
  'Dragon Fruit',
  'Pomegranate',
  'Fig',
  'Apricot'
];

export const availableFlavors: string[] = [
  'Chocolate',
  'Vanilla',
  'Mango',
  'Strawberry',
  'Pistachio',
  'Coffee',
  'Caramel',
  'Raspberry',
  'Blueberry',
  'Lemon'
];

export const availableIngredients: string[] = [
  'Milk',
  'Cream',
  'Sugar',
  'Cocoa Powder',
  'Vanilla Extract',
  'Strawberries',
  'Banana',
  'Pineapple',
  'Kiwi',
  'Grapes',
  'Watermelon',
  'Blueberries',
  'Raspberries',
  'Blackberries',
  'Peach',
  'Pear',
  'Plum',
  'Mango',
  'Lemon',
  'Lime',
  'Coconut',
  'Guava',
  'Papaya',
  'Cantaloupe',
  'Honeydew',
  'Passion Fruit',
  'Dragon Fruit',
  'Pomegranate',
  'Fig',
  'Apricot'
];
