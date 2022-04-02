import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StudiesApi } from './services/studies.api';
import { StudiesRoutingModule } from './studies-routing.module';
import { StudiesStore } from './services/studies.store';
import { SurveyBuilderPage } from './pages/survey-builder/survey-builder.page';
import { SurveyListPage } from './pages/survey-list/survey-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudiesRoutingModule,
  ],
  declarations: [SurveyBuilderPage, SurveyListPage ],
  providers: [StudiesApi, StudiesStore]
})
export class StudiesModule {}
