import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { environment } from 'src/environment/environment';

var apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public createUser(data: any): Observable<any> {
    return this.webApiService.post(apiUrl + "user", data);
  }

  public getUser(id: number): Observable<any> {
    return this.webApiService.get(apiUrl + "user/" + id);
  }

  public updateUser(id: number, data: any): Observable<any> {
    return this.webApiService.put(apiUrl + "user/" + id, data);
  }

  public deleteUser(id: number): Observable<any> {
    return this.webApiService.delete(apiUrl + "user/" + id);
  }

  public getAllUsers(): Observable<any> {
    return this.webApiService.get(apiUrl + "user");
  }
  
}
