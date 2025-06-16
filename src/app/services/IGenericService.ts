import { Observable } from "rxjs";
import { RestResponse } from "../models/RestResponse";

export interface IGenericService<T> {
    create(object: T): Observable<RestResponse<T>>;
    delete(id: number): void;
    update(id: number, object: T): Observable<RestResponse<T>>;
    findById(id: number): Observable<RestResponse<T>>;
    findAll(size: number, page: number): Observable<RestResponse<T[]>>;

}