import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL, prodURL } from 'src/environments/environment';

@Injectable()
export class SurveyBuilderApi {

	constructor(private http: HttpClient) {}

  /*header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');*/

  createSurvey(survey: any) {
    const options = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      //.set('Access-Control-Allow-Methods', 'POST')
      //.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    };
    return this.http.post<any[]>(`${prodURL}/survey/new`, survey, options);
  }

}
