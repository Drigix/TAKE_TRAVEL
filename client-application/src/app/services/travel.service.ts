import { Injectable } from '@angular/core';
import { API_URL } from '../config/api-url.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Travel } from '../entitites/travel.model';

export type EntityArrayResponseType = HttpResponse<Travel[]>;

@Injectable({providedIn: 'root'})
export class TravelService {

  private url = API_URL + 'travel'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Travel[]>(this.url + '/getAllTravel', {observe: 'response'});
  }

  getAllNotDeleted(): Observable<EntityArrayResponseType> {
    return this.http.get<Travel[]>(this.url + '/getAllNotDeletedTravel', {observe: 'response'});
  }

  create(travel: Travel): Observable<HttpResponse<void>> {
    return this.http.post<HttpResponse<void>>(this.url + '/createTravel', travel);
  }

  update(travel: Travel): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(this.url + '/editTravel', travel);
  }

  delete(travelId: number): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(`${this.url}/deleteTravel/${travelId}`);
  }
}
