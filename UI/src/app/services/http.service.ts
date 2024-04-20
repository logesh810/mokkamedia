import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  httpHeader: any
  baseUrl: string = "http://192.168.1.39:3000/";
  constructor(private http: HttpClient) {

    this.httpHeader = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*' })
    }
  }

  post(url: string, data: any): Observable<any> {
    console.log(this.baseUrl + url);
    console.log(JSON.stringify(data));


    return this.http.post<any>(this.baseUrl + url, JSON.stringify(data), this.httpHeader).pipe(catchError(this.handleError));
  }

  handleError(e: HttpErrorResponse) {
    return "";
  }

}
