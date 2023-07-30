import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IceCreamCreateComponent } from './ice-cream-create/ice-cream-create.component';
import { IceCreamListComponent } from './ice-cream-list/ice-cream-list.component';
import { SharedModule } from '../shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IceCreamListComponent,
    IceCreamCreateComponent
  ],
  providers: [
    DialogService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ComponentsModule {}
