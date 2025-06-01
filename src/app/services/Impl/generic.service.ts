import { Injectable } from '@angular/core';
import { IGenericService } from '../IGenericService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestResponse } from '../../models/RestResponse';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> implements IGenericService<T> {

  protected apiUrl!: string
  protected endpoint!: string
  constructor(protected readonly http: HttpClient) {

  }


  create(object: T): Observable<RestResponse<T>> {
    return this.http.post<RestResponse<T>>(this.apiUrl, object);
  }
  delete(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`);
  }
  update(id: number, object: T): Observable<RestResponse<T>> {
    return this.http.post<RestResponse<T>>(`${this.apiUrl}/${id}`, object);
  }
  findById(id: number): Observable<RestResponse<T>> {
    return this.http.get<RestResponse<T>>(`${this.apiUrl}/${id}`);
  }
  findAll(size: number = environment.size, page: number = environment.page): Observable<RestResponse<T[]>> {
    return this.http.get<RestResponse<T[]>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
