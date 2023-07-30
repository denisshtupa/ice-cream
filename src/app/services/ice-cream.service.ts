import { Injectable } from '@angular/core';
import { IIceCreamFlavor } from '../interfaces/ice-cream.interface';
import { fakeIceCreamData } from '../shared/constants';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IceCreamService {
  private iceCreamFlavors: IIceCreamFlavor[] = fakeIceCreamData;

  getAllIceCreamFlavors(): IIceCreamFlavor[] {
    return this.iceCreamFlavors;
  }

  private flavorExists(flavor: IIceCreamFlavor): boolean {
    const exists: boolean = this.iceCreamFlavors.some((f: IIceCreamFlavor) => f.name === flavor.name.trim());
    return exists;
  }

  addIceCreamFlavor(flavor: IIceCreamFlavor): Observable<void> {
    if (this.flavorExists(flavor)) {
      return throwError(() => new Error('Flavor already exists'));
    }

    this.iceCreamFlavors.push(flavor);
    return of(undefined);
  }
}
