import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsPageRoutingModule } from './groups-routing.module';
import { GroupsPage } from './pages/groups/groups.page';
import { GroupsApi } from './services/groups.api';
import { GroupsStore } from './services/groups.store';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GroupsPageRoutingModule
  ],
  declarations: [GroupsPage],
  providers: [GroupsApi, GroupsStore]
})
export class GroupsModule {}
