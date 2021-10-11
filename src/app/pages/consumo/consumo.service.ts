import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  constructor(private http: HttpClient) { }
  
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  get(urlName: string, uc): Observable<any>{
    return this.http.get(`${environment.URL_AWS}${urlName}`,{ params: {
      uc: uc}, observe: "response", headers: this.headers });
  }
}
