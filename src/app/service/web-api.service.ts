import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.get(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
      );
  }

  post(url: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.post(
      url,
      data,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
      )
  }

  put(url: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.put(
      url,
      data,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
      )
  }

  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };

    return this.httpClient.delete(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
      )
  }

  private ReturnResponseData(response: any) {
    return response;
  }
}
