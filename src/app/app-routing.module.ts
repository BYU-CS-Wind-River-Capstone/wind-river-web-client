import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'survey-builder',
    loadChildren: () => import('./survey-builder/survey-builder.module').then( m => m.SurveyBuilderPageModule)
  },
  {
    path: 'data-management',
    loadChildren: () => import('./data-management/data-management.module').then(m => m.DataManagementPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
