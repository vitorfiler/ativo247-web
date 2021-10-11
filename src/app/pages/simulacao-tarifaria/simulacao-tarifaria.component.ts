import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { Email } from 'src/app/_models/email';
import { DashboardService } from '../dashboard/dashboard.service';
import { single } from './data';
import { SimulacaoTarifaService } from './simulacao-tarifa.service';

@Component({
  selector: 'vex-simulacao-tarifaria',
  templateUrl: './simulacao-tarifaria.component.html',
  styleUrls: ['./simulacao-tarifaria.component.scss']
})
export class SimulacaoTarifariaComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;  
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Competência';
  showYAxisLabel = true;
  yAxisLabel = 'Economia [R$]';

  colorScheme = {
    domain: ['#1d75ab']
  };

  demandaIdeal: any = [];
  cientId: string;
  tarifaria: string;
  ponta: string;
  foraPonta: string;
  anual: string;
  constructor(private commomService: CommomService, private router: Router, private simulacaoTarifaService: SimulacaoTarifaService) {
    Object.assign(this, { single })
  }

  ngOnInit(): void {
    this.cientId = window.localStorage.getItem('clientId');
    if(!this.simulacaoTarifaService.uc){
      this.router.navigate(['grafico-demanda']);
    }
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
      this.router.navigate(['login']);
      return;
   } 
   this.grafico()
  }

  async grafico(){
    this.demandaIdeal = []
    let uc = this.simulacaoTarifaService.uc
    let demandaIdeal = await this.getDadosTarifa(uc)
    console.log(demandaIdeal);
    let email = new Email();
    for (let i = 0; i < single.length; i++) {
      single[i].name = demandaIdeal.meses[i]
      single[i].value = demandaIdeal.economia_grafico[i]
    }
    email.clienteID = this.cientId;
    email.demContFpta = demandaIdeal.dem_contratada_fpta
    email.demContPta = demandaIdeal.dem_contratada_pta
    email.economia = demandaIdeal.economia_anual
    email.subgrupo = demandaIdeal.subgrupo
    email.uc = this.simulacaoTarifaService.uc

    this.tarifaria = demandaIdeal.subgrupo;
    this.ponta = demandaIdeal.dem_contratada_pta;
    this.foraPonta = demandaIdeal.dem_contratada_fpta;
    this.anual = demandaIdeal.economia_anual;

    this.demandaIdeal = single;
    this.simulacaoTarifaService.email('/mailing', email).subscribe(response=>{
      console.log("email: "+ response);
      
    })
  }


  getDadosTarifa(uc): any{
    return new Promise((resolve)=> {this.simulacaoTarifaService.get('/demIDEAL', uc)
    .subscribe(response => {
        resolve(response.body.Unidades);
        });
    });
  }
}
