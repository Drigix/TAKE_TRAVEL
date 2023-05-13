import { Injectable } from '@angular/core';
import { API_URL } from '../config/api-url.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Bus, BusPassword } from '../entitites/bus.model';

export type CreateBusResponseType = HttpResponse<string>;
export type EntityArrayResponseType = HttpResponse<Bus[]>;
export type EntityResponseType = HttpResponse<Bus>;
export type BusPasswordResponseType = HttpResponse<BusPassword>;

@Injectable({providedIn: 'root'})
export class BusService {

  private url = API_URL + 'buss'

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<EntityArrayResponseType> {
    return this.http.get<Bus[]>(this.url + '/getAllBuss', {observe: 'response'});
  }

  getAllNotDeleted(): Observable<EntityArrayResponseType> {
    return this.http.get<Bus[]>(this.url + '/getAllNotDeletedBuss', {observe: 'response'});
  }

  create(bus: Bus): Observable<BusPasswordResponseType> {
    return this.http.post<BusPassword>(this.url + '/createBus', bus, {observe: 'response'});
  }

  changePassword(password: BusPassword): Observable<HttpResponse<void>> {
    return this.http.put<void>(this.url + '/changePassword', password, {observe: 'response'});
  }

  edit(bus: Bus): Observable<EntityResponseType> {
    return this.http.put<Bus>(this.url + '/editBus', bus, {observe: 'response'});
  }


  delete(busId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.url}/deleteBus/${busId}`, {observe: 'response'});
  }

}
