import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { LearningResourcesApi } from './services/learning-resources.api';
import { LearningResourcesStore } from './services/learning-resources.store';
import { LearningResourceListPage } from './pages/learning-resource-list/learning-resource-list.page';
import { LearningResourcesRoutingModule } from './learning-resources.routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LearningResourcesRoutingModule,
  ],
  declarations: [LearningResourceListPage ],
  providers: [LearningResourcesApi, LearningResourcesStore]
})
export class LearningResourcesModule {}
