import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryEnum } from 'src/app/enums/category.enum';
import { IIceCreamFlavor } from 'src/app/interfaces/ice-cream.interface';
import { IceCreamService } from 'src/app/services/ice-cream.service';
import { availableFlavors, availableFruits, availableIngredients } from 'src/app/shared/constants';
import { extractSpecifications } from 'src/app/shared/helpers';

@Component({
  selector: 'app-ice-cream-create',
  templateUrl: './ice-cream-create.component.html',
  styleUrls: ['./ice-cream-create.component.scss']
})
export class IceCreamCreateComponent {
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
    private config: DynamicDialogConfig
  ) {
    this.numberOfExistingFlavors = config.data.existingFlavorsNumber;

    this.initFlavorForm();
  }

  ngOnInit() {
  }

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

    this.flavorForm.get('category').valueChanges.subscribe((category: CategoryEnum) => {
      this.resetCategoryFields();
      this.setValidatorsForCategory(category);
    });
  }

  private resetCategoryFields(): void {
    this.flavorForm.get('creamContent').reset();
    this.flavorForm.get('fruitContent').reset();
    this.flavorForm.get('fruits').reset();
    this.flavorForm.get('flavors').reset();
  }

  private setValidatorsForCategory(category: CategoryEnum): void {
    if (category === CategoryEnum.CreamIce) {
      this.flavorForm.get('creamContent').setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
    } else {
      this.flavorForm.get('creamContent').clearValidators();
    }

    if (category === CategoryEnum.FruitIce) {
      this.flavorForm.get('fruitContent').setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      this.flavorForm.get('fruits').setValidators(Validators.required);
    } else {
      this.flavorForm.get('fruitContent').clearValidators();
      this.flavorForm.get('fruits').clearValidators();
    }

    if (category === CategoryEnum.WaterIce) {
      this.flavorForm.get('flavors').setValidators(Validators.required);
    } else {
      this.flavorForm.get('flavors').clearValidators();
    }

    // Update the validators
    this.flavorForm.updateValueAndValidity();
  }

  public onSubmit(): void {
    if (this.flavorForm.valid) {
      const formValue = this.flavorForm.value;
      const { name, category } = formValue;
      const specifications = extractSpecifications(category, formValue);

      const model: IIceCreamFlavor = {
        id: this.numberOfExistingFlavors + 1,
        name,
        category,
        specifications,
      };

      this.iceCreamService.addIceCreamFlavor(model);
      this.dialogRef.close();
    } else {
      return;
    }
  }

}
