import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from 'src/app/types/group.types';
import { apiURL } from 'src/environments/environment';

@Injectable()
export class GroupsApi {
    constructor(private http: HttpClient) {}

    createGroup(resource: Group): Observable<Group> {
      return this.http.post<Group>(`${apiURL}/groups/create`, resource);
    }

    getAllGroups(): Observable<Group[]> {
      return this.http.get<Group[]>(`${apiURL}/groups`);
    }

    // editGroup(resource: Group): Observable<Group> {
    //   return this.http.post<Group>(`${apiURL}/learning-resource/edit`, resource);
    // }

    deleteGroup(resource: any): Observable<any> {
      return this.http.post<Group>(`${apiURL}/groups/delete`, resource);
    }
}
