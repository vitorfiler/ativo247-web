import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestaoEnergiaService {

  constructor(private http: HttpClient) { }

  baseUrl = `${environment.URL_AWS}/status-v2`;

  getStatus(clienteId: string): Observable<any> {
    return this.http
          .get(`${this.baseUrl}`, {
              params: {
                  clienteID: clienteId
              },
              observe: "response",
          });
  }
}
