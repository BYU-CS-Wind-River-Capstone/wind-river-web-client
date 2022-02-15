import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyBuilderPage } from './pages/survey-builder/survey-builder.page';
import { SurveyListPage } from './pages/survey-list/survey-list.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyBuilderPage
  },
  {
    path: 'surveys',
    component: SurveyListPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudiesRoutingModule {}
