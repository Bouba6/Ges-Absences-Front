import { Observable } from "rxjs";
import { User } from "../models/User";
import { HttpResponse } from "@angular/common/http";

export interface ILoginService {

    SelectByLoginPassword(login: string, password: string,withCredentials?: boolean): Observable<HttpResponse<User>>
}