import { NgModule } from '@angular/core';
import { FormatToGermanCurrPipe } from './pipe/price-formatter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [
    FormatToGermanCurrPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule
  ],
  exports: [
    FormatToGermanCurrPipe,

    TableModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [
  ]
})
export class SharedModule { }
