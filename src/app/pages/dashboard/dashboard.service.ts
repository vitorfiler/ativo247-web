import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  consumoGauge1: number
  consumoGauge2: number
  consumoGauge3: number
  max1: number
  max2: number
  max3: number
  thresholds1 = {}
  thresholds2 = {}
  thresholds3 = {}
  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  get(urlName: string, uc, mes): Observable<any>{
    return this.http.get(`${environment.URL_AWS}${urlName}`,{ params: {
      uc: uc, mes_fatu: mes}, observe: "response", headers: this.headers });
  }

}
