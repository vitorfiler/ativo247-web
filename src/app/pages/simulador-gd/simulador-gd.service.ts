import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimuladorGdService {
  
  constructor(private http: HttpClient) {}
  urlBase = `${environment.URL_AWS}/economia`;

  getSimulador(valorFatura: string): Promise<any> {
      let promisse = this.http
          .get(`${this.urlBase}`, {
              params: {
                  valor_fatura: valorFatura,
              },
              observe: "response",
          })
          .toPromise();
      return promisse;
  }
}
