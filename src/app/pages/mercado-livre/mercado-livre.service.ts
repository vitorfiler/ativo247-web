import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoLivreService {
  
  constructor(private http: HttpClient) {}
  urlBase = `${environment.URL_AWS}/`;


}
