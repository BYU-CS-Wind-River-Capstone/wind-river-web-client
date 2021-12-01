import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyBuilderPage } from './survey-builder.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyBuilderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyBuilderPageRoutingModule {}
