import { CadMetasService } from './cad-metas.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';

@Component({
  selector: 'vex-cad-metas',
  templateUrl: './cad-metas.component.html',
  styleUrls: ['./cad-metas.component.scss']
})
export class CadMetasComponent implements OnInit {

  ucSelecionado: string;
  mesSelecionado: string;
  consumoMensalMeta: number;
  faturaEnergiaMeta: number;
  consumoMensalLimite: number;
  faturaEnergiaLimite: number;
  disableSalvar: boolean = false;

  constructor(public dashboardService: DashboardService, public cadMetasService: CadMetasService,
    private router: Router, private commomService: CommomService) { }

  ngOnInit() {
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
    }
    this.getStorages();
    this.setFieldsEdited();
  }

  getStorages(){
    this.ucSelecionado = localStorage.getItem('ucSelecionado');
    this.mesSelecionado = localStorage.getItem('mesSelecionado');
    //console.log(this.ucSelecionado);
    localStorage.removeItem('ucSelecionado');
    localStorage.removeItem('mesSelecionado');    
  }

  async setFieldsEdited(){
    let loja = await this.getDataDashboard(this.ucSelecionado, this.mesSelecionado);

    this.consumoMensalMeta = loja[0].consumo_meta;
    this.faturaEnergiaMeta = loja[0].fatura_meta;
    this.consumoMensalLimite = loja[0].consumo_limite;
    this.faturaEnergiaLimite = loja[0].fatura_limite;
  }

  getDataDashboard(uc, mes): any{
    return new Promise((resolve)=> {this.dashboardService.get('/dashboard', uc, mes)
    .subscribe(response => {
        resolve(response.body.Dashboard);
        });
    });
  }

  sendFields(){    
    this.cadMetasService.save('/cadastro', this.ucSelecionado, this.consumoMensalMeta, this.consumoMensalLimite, this.faturaEnergiaMeta, this.faturaEnergiaLimite).subscribe();
  }

  disableButton(){

    if(+this.consumoMensalMeta > +this.consumoMensalLimite || +this.faturaEnergiaMeta > +this.consumoMensalLimite){
      this.disableSalvar = true;
    }
    else {
      this.disableSalvar = false;
    }
  }
}
