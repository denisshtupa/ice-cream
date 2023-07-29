import { CategoryEnum } from "../enums/category.enum";
import { IIceCreamSpecifications } from "../interfaces/ice-cream.interface";

export const extractSpecifications = (category: CategoryEnum, formValue: any): IIceCreamSpecifications => {
  const {
    buyingPrice,
    sellingPrice,
    creamContent,
    flavors,
    foodIntolerances,
    fruitContent,
    fruits,
    ingredients,
    nutritionalValue,
  } = formValue;

  const specifications: IIceCreamSpecifications = {
    buyingPrice,
    sellingPrice,
    ingredients,
    foodIntolerances,
    nutritionalValue,
    id: 1,
  };

  if (category === CategoryEnum.CreamIce) {
    specifications.creamContent = creamContent;
  } else if (category === CategoryEnum.FruitIce) {
    specifications.fruitContent = fruitContent;
    specifications.fruits = fruits;
  } else {
    specifications.flavors = flavors;
  }

  return specifications;
}
