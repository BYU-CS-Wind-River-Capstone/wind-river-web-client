import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyBuilderPageRoutingModule } from './survey-builder-routing.module';

import { SurveyBuilderPage } from './survey-builder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyBuilderPageRoutingModule
  ],
  declarations: [SurveyBuilderPage]
})
export class SurveyBuilderPageModule {}
