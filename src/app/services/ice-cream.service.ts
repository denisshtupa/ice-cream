import { Injectable } from '@angular/core';
import { IIceCreamFlavor } from '../interfaces/ice-cream.interface';
import { fakeIceCreamData } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class IceCreamService {
  private iceCreamFlavors: IIceCreamFlavor[] = fakeIceCreamData;

  addIceCreamFlavor(flavor: IIceCreamFlavor): void {
    this.iceCreamFlavors.push(flavor);
  }

  getAllIceCreamFlavors(): IIceCreamFlavor[] {
    return this.iceCreamFlavors;
  }
}
