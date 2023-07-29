import { Component } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/category.enum';
import { IIceCreamFlavor } from 'src/app/interfaces/ice-cream.interface';
import { IceCreamService } from 'src/app/services/ice-cream.service';
import { DialogService } from 'primeng/dynamicdialog';
import { IceCreamCreateComponent } from '../ice-cream-create/ice-cream-create.component';

@Component({
  selector: 'app-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.scss']
})
export class IceCreamListComponent {
  public CategoryEnum = CategoryEnum; // Expose the CategoryEnum to the template
  public iceCreamFlavors: IIceCreamFlavor[] = [];

  constructor(private iceCreamService: IceCreamService, private dialogService: DialogService) {
    this.iceCreamFlavors = iceCreamService.getAllIceCreamFlavors();
  }

  getCategorySeverity(status: CategoryEnum){
    switch (status) {
      case CategoryEnum.CreamIce:
        return 'danger';
      case CategoryEnum.FruitIce:
        return 'success';
      case CategoryEnum.WaterIce:
        return 'info';
      default:
        return 'info';
    }
  }

  public showAddFlavorModal = () => {
    const width: string = window.innerWidth < 768 ? '90%' : '60%'; // Adjust the width based on the screen size
    const height: string = '80%';

    this.dialogService.open(IceCreamCreateComponent, {
      header: 'Add new sort of ice cream',
      width,
      height,
      data: { existingFlavorsNumber: this.iceCreamFlavors.length }
    });
  }

}
