import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root",
})
export class GraficoDemandaService {
    constructor(private http: HttpClient) {}
    baseUrlFinanceiro = `${environment.URL_AWS}/financeirov2`;
    baseUrlDemanda = `${environment.URL_AWS}/demanda`;
    baseUrlConsumo = `${environment.URL_AWS}/consumov2`;

    getDemanda(clientId: string): Observable<any> {
        return this.http
            .get(`${this.baseUrlDemanda}`, {
                params: {
                    clienteID: clientId,
                },
                observe: "response",
            });
    }
    getFinanceiro(clientId: string): Observable<any> {
        return this.http
            .get(`${this.baseUrlFinanceiro}`, {
                params: {
                    clienteID: clientId,
                },
                observe: "response",
            })
    }
    getGraficoConsumo(clientId: string): Observable<any> {
        return this.http
            .get(`${this.baseUrlConsumo}`, {
                params: {
                    clienteID: clientId,
                },
                observe: "response",
            })
    }
}
