import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficoDemandaService {

  constructor(private http: HttpClient) {}
  baseUrl = `${environment.URL_AWS}/demandav2`;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  getDemanda(clientId: string): Observable<any> {
      return this.http
          .get(`${this.baseUrl}`, {
              params: {
                  clienteID: clientId,
              },
              observe: "response",
          });
  }
  getFinanceiro(clientId: string): Observable<any> {
      return this.http
          .get(`${this.baseUrl}`, {
              params: {
                  clienteID: clientId,
              },
              observe: "response",
          })
  }

  get(urlName: string, uc): Observable<any>{
    return this.http.get(`${environment.URL_AWS}${urlName}`,{ params: {
      uc: uc}, observe: "response", headers: this.headers });
  }
}
