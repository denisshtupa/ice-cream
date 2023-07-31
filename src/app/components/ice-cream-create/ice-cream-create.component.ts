import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryEnum } from 'src/app/enums/category.enum';
import { IIceCreamFlavor, IIceCreamSpecifications } from 'src/app/interfaces/ice-cream.interface';
import { IceCreamService } from 'src/app/services/ice-cream.service';
import { availableFlavors, availableFruits, availableIngredients } from 'src/app/shared/constants';
import { extractSpecifications } from 'src/app/shared/helpers';

@Component({
  selector: 'app-ice-cream-create',
  templateUrl: './ice-cream-create.component.html',
  styleUrls: ['./ice-cream-create.component.scss']
})
export class IceCreamCreateComponent implements OnInit {
  public CategoryEnum = CategoryEnum; // Expose the CategoryEnum to the template
  public flavorForm: FormGroup;
  public categoryEnum = Object.values(CategoryEnum);
  public numberOfExistingFlavors: number = 0;
  public availableFruits: string[] = availableFruits;
  public availableFlavors: string[] = availableFlavors;
  public availableIngredients: string[] = availableIngredients;

  constructor(
    private dialogRef: DynamicDialogRef,
    private iceCreamService: IceCreamService,
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.numberOfExistingFlavors = this.config.data.existingFlavorsNumber;
    this.initFlavorForm();
  }

  // Initialization of flavor form
  private initFlavorForm() {
    this.flavorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      category: [null, Validators.required],
      creamContent: [''],
      fruitContent: [''],
      fruits: [''],
      flavors: [''],
      ingredients: ['', Validators.required],
      foodIntolerances: ['', Validators.required],
      nutritionalValue: ['', [Validators.required, Validators.min(0)]],
      buyingPrice: ['', [Validators.required, Validators.min(0)]],
      sellingPrice: ['', [Validators.required, Validators.min(0)]]
    });

    this.flavorForm.get('category').valueChanges.subscribe({
      next: () => {
        this.setValidatorsForCategory();
      }
    });
  }

  // Updating validators in case of category change
  public setValidatorsForCategory(): void {
    const category = this.flavorForm.get('category').value;
    const creamContentControl = this.flavorForm.get('creamContent');
    const fruitContentControl = this.flavorForm.get('fruitContent');
    const fruitsControl = this.flavorForm.get('fruits');
    const flavorsControl = this.flavorForm.get('flavors');

    if (category === CategoryEnum.CreamIce) {
      creamContentControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      fruitContentControl.clearValidators();
      fruitsControl.clearValidators();
      flavorsControl.clearValidators();
    } else if (category === CategoryEnum.FruitIce) {
      creamContentControl.clearValidators();
      fruitContentControl.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      fruitsControl.setValidators(Validators.required);
      flavorsControl.clearValidators();
    } else if (category === CategoryEnum.WaterIce) {
      creamContentControl.clearValidators();
      fruitContentControl.clearValidators();
      fruitsControl.clearValidators();
      flavorsControl.setValidators([Validators.required]);
    }

    creamContentControl.updateValueAndValidity();
    fruitContentControl.updateValueAndValidity();
    fruitsControl.updateValueAndValidity();
    flavorsControl.updateValueAndValidity();
  }

  // Handler for form submission
  public onSubmit(): void {
    if (this.flavorForm.valid) {
      const formValue = this.flavorForm.value;
      const { name, category } = formValue;
      const specifications: IIceCreamSpecifications = extractSpecifications(category, formValue);

      const model: IIceCreamFlavor = {
        id: this.numberOfExistingFlavors + 1,
        name,
        category,
        specifications
      };

      this.addFlavor(model);
    } else {
      return;
    }
  }

  // Triggering service to add new flavor
  private addFlavor = (model: IIceCreamFlavor) => {
    this.iceCreamService.addIceCreamFlavor(model).subscribe({
      next: () => {
        this.dialogRef.close();
        this.showToastMessage('success', 'Success', 'New flavor is just added.');
      },
      error: (err: string) => {
        this.showToastMessage('error', 'Failed', err);
      }
    });
  }

  // Show toast message. Used when addIceCreamFlavor service is called
  private showToastMessage = (severity: string, summary: string, detail: string) => {
    this.messageService.add(
      { life: 4000,
        severity,
        summary,
        detail
      }
    );
  }

}
