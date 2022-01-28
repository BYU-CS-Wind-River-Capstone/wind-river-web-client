import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable()
export class DataManagementApi {
  constructor(private http: HttpClient) {}


}
