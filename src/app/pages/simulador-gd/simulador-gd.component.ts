import { Component, OnInit } from "@angular/core";
import { SimuladorGdService } from "./simulador-gd.service";
import { CommomService } from './../../services/commom.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-simulador-gd",
    templateUrl: "./simulador-gd.component.html",
    styleUrls: ["./simulador-gd.component.scss"],
})
export class SimuladorGdComponent implements OnInit {
    CO2: number = 0;
    economia_anual: string = "";
    n_arvores: number = 0;
    valorFatura: string = "";
    falhaFatura: string = "";
    falhaValorFatura: Boolean = false;
    
    constructor(private commomService: CommomService, private simuladorGdService: SimuladorGdService, private router: Router) {}

    ngOnInit() {
        var retornoValida  = this.commomService.validaSessao();
        if(!retornoValida){
            this.router.navigate(['login']);
            return;
         } 
    }

    getSimulador(valorFatura: string): Promise<any> {

        if(valorFatura == null){
            this.falhaValorFatura = true;
            this.falhaFatura = 'Favor informar apenas números no campo de Valor.';
            return;
        }
        
        let valor = Number(valorFatura);
        if(valor < 1200){
            this.falhaValorFatura = true;
            this.falhaFatura = 'Valor informado é menor que o mínimo.';
            return;
        }

        var valorFaturaReal = valorFatura.toString();
        if(valorFaturaReal.includes(",")){
            valorFatura = valorFatura.replace(",",".");
        }
        this.falhaValorFatura = false;
        return this.simuladorGdService
            .getSimulador(valorFaturaReal)
            .then((response) => {
                this.n_arvores = response.body.Economia[0].n_arvores;
                this.CO2 = response.body.Economia[0].CO2;
                this.economia_anual = response.body.Economia[0].economia_anual;
            })
            .catch(() => {
                console.log("Error");
            });
    }
}
