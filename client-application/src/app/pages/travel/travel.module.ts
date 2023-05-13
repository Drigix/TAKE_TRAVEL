import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from 'src/app/components/components.module';
import { TravelComponent } from './travel.component';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelDialogComponent } from './travel-dialog/travel-dialog.component';


@NgModule({
  imports: [
    TravelRoutingModule,
    ComponentsModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TravelComponent,
    TravelDialogComponent
  ],
  declarations: [
    TravelComponent,
    TravelDialogComponent
  ],
  providers: [],
})
export class TravelModule { }
