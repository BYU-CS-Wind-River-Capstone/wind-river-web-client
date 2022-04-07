import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'studies',
    loadChildren: () => import('./studies/studies.module').then( m => m.StudiesModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'learning-resources',
    loadChildren: () => import('./LearningResources/learning-resources.module').then( m => m.LearningResourcesModule),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
