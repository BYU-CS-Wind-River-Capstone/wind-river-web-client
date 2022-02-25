import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL, prodURL, testURL } from 'src/environments/environment';

@Injectable()
export class SurveyBuilderApi {

	constructor(private http: HttpClient) {}

  /*header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');*/

  createSurvey(survey: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any[]>(`${testURL}/survey/new`, survey, options);
  }

}
