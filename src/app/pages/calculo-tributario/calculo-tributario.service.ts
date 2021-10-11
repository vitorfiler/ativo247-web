import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculoTributario } from 'src/app/_models/calculo-tributario';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CalculoTributarioService {

	constructor(private http: HttpClient) { }

	headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
	urlBase = `${environment.URL_AWS}`;
	// urlBase = `${environment.urlMock}`;

	getCalculoTributario(uc: string):Observable<any>{
		return this.http.get(`${environment.URL_AWS}/calculo_tributario_v2?unidade_consumidora=${uc}`,
		{  observe: "response" });
		// params: {
			// unidade_consumidora: uc}
	}
}
