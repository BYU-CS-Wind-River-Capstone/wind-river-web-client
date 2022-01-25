import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'survey-builder',
    pathMatch: 'full'
  },
  {
    path: 'survey-builder',
    loadChildren: () => import('./survey-builder/survey-builder.module').then( m => m.SurveyBuilderPageModule)
  },
  {
    path: 'data-management',
    loadChildren () => import('./data-management/data-management.module').then(m => )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
