import { Component, NgZone, OnInit } from '@angular/core';
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
    private ngZone: NgZone,
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
        this.resetCategoryFields();
      },
      complete: () => {
        const category = this.flavorForm.get('category').value;
        this.setValidatorsForCategory(category);
      }
    });
  }

  // Resets all category related fields to initial state.
  public resetCategoryFields(): void {
    this.flavorForm.get('creamContent').reset();
    this.flavorForm.get('fruitContent').reset();
    this.flavorForm.get('fruits').reset();
    this.flavorForm.get('flavors').reset();
  }

  // Updating validators in case of category change
  public setValidatorsForCategory(category: CategoryEnum): void {
    this.ngZone.run(() => {
      if (category === CategoryEnum.CreamIce) {
        this.flavorForm.get('creamContent').setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
        this.flavorForm.get('fruitContent').setValidators(null)
        this.flavorForm.get('fruits').setValidators(null);
        this.flavorForm.get('flavors').setValidators(null);
      } else if (category === CategoryEnum.FruitIce) {
        this.flavorForm.get('creamContent').setValidators(null);
        this.flavorForm.get('flavors').setValidators(null);
        this.flavorForm.get('fruitContent').setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
        this.flavorForm.get('fruits').setValidators(Validators.required);
      } else if (category === CategoryEnum.WaterIce) {
        this.flavorForm.get('creamContent').setValidators(null);
        this.flavorForm.get('fruitContent').setValidators(null);
        this.flavorForm.get('fruits').setValidators(null);
        this.flavorForm.get('flavors').setValidators([Validators.required]);
      }

      this.flavorForm.updateValueAndValidity();
    });
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

  // Success toast message, triggered after new flavor is added
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
