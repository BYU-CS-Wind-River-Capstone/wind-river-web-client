import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataManagementComponent } from './data-management.component';
import { DataManagementApi } from './data-management.api';
import {DataManagementRoutingModule} from './data-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataManagementRoutingModule,
    HttpClientModule
  ],
  declarations: [DataManagementComponent],
  providers: [DataManagementApi]
})
export class DataManagementPageModule {}
