import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningResourceListPage } from './pages/learning-resource-list/learning-resource-list.page';

const routes: Routes = [
  {
    path: 'list',
    component: LearningResourceListPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningResourcesRoutingModule {}
