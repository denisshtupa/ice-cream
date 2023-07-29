import { CategoryEnum } from "../enums/category.enum";

export interface IIceCreamFlavor {
  id: number;
  name: string;
  category: CategoryEnum;
  specifications: IIceCreamSpecifications
}

export interface IIceCreamSpecifications {
  id: number;
  ingredients: string[];
  foodIntolerances: string;
  nutritionalValue: number;
  buyingPrice: number;
  sellingPrice: number;
  fruitContent?: number; // Optional property for Fruit ice cream
  creamContent?: number; // Optional property for Cream ice cream
  fruits?: string[]; // Optional property for Fruit ice cream
  flavors?: string[]; // Optional property for Water ice cream
}
