import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/app/_models/email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoTarifaService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  uc: string = "";
  
  get(urlName: string, uc): Observable<any>{
    return this.http.get(`${environment.URL_AWS}${urlName}`,{ params: {
      uc: uc}, observe: "response", headers: this.headers });
  }

  email(urlName: string, email: Email): Observable<any>{
    let value = email.economia.substring(3)
    let economia = value.replace(",",".")
    return this.http.get(`${environment.URL_AWS}${urlName}`,{ params: {
      clienteID: email.clienteID, uc: email.uc,subgrupo: email.subgrupo, dem_cont_pta: email.demContPta,
      dem_cont_fpta: email.demContFpta, economia: economia}, observe: "response", headers: this.headers });
  }
}
