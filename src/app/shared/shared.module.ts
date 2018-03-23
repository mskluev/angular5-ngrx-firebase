import { MaterialModule } from './../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule]
})
export class SharedModule {}
