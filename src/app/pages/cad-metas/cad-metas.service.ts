import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadMetasService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  save(urlName: string, ucSelecionado, consumoMensalMeta, consumoMensalLimite, faturaEnergiaMeta, faturaEnergiaLimite): Observable<any>{
    return this.http.get(`${environment.URL_AWS}${urlName}`,{ params: {
      uc: ucSelecionado, consumo_meta: consumoMensalMeta, consumo_limite: consumoMensalLimite, fatura_meta: faturaEnergiaMeta, fatura_limite: faturaEnergiaLimite},
      observe: "response", headers: this.headers });
 }
}
