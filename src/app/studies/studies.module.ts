import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StudiesRoutingModule } from './studies-routing.module';
import { StudiesApi } from './services/studies.api';
import { SurveyBuilderPage } from './pages/survey-builder/survey-builder.page';
import { SurveyListPage } from './pages/survey-list/survey-list.page';
import { StudiesStore } from './services/studies.store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudiesRoutingModule,
    HttpClientModule
  ],
  declarations: [SurveyBuilderPage, SurveyListPage ],
  providers: [StudiesApi, StudiesStore]
})
export class StudiesModule {}
