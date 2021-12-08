import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SurveyBuilderApi } from './survey-builder.api';
import { SurveyBuilderPage } from './survey-builder.page';
import { SurveyBuilderPageRoutingModule } from './survey-builder-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyBuilderPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SurveyBuilderPage],
  providers: [SurveyBuilderApi]
})
export class SurveyBuilderPageModule {}
