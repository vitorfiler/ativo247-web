import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { PreencheGrafico } from 'src/app/_models/barras';
import { Consumo } from 'src/app/_models/consumo';
import { Unidade } from 'src/app/_models/unidade';
import { lineChartSeriesConsumo, barChartConsumo } from './data'
import { ConsumoService } from './consumo.service';

@Component({
  selector: 'vex-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.scss']
})
export class ConsumoComponent implements OnInit {

  single: any[];
  multi: any[];
  unidade = new Unidade();
  // view: any[] = [700, 400];
  lojasStorage: any;
  lojas: any;
  listLojas: any = [];
  listDemanda: any[]=[];
  barras: any[] = [];
  linhaMedia: any[] = [];
  demandaContratada: number = 0;
  razao: number = 0;
  demanda: number = 0;
  maior: number = 0;

  // options combo
  view = [600,400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  legendTitle = 'Legenda';
  legendPosition = 'below';//'right';
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Consumo real [kWh]';
  xAxisLabel = 'COMPETÊNCIA';
  showGridLines = true;
  innerPadding = '10%';
  animations: boolean = true;
  barChartConsumo: any[] = barChartConsumo;
  lineChartSeriesConsumo: any[] = lineChartSeriesConsumo;
  lineChartSchemeConsumo = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    domain: []
  };

  comboBarSchemeConsumo = {
    name: 'singleLightBlue',
    selectable: true,
    group: 'Ordinal',
    domain: ['#116db3']
  };

  showRightYAxisLabel: boolean = false;
  yAxisLabelRight: string = '';

  previsao: string = "";
  precisao: string = "";
  clientId: string;

  displayedColumns: string[] = ["mes", "consumo", "projecao", "precisao"];
  dataSource: MatTableDataSource<Consumo>;
  listTableConsumo: any;
  preencheTable: Consumo[] = [];
  
  constructor(private commomService: CommomService,
    private router: Router,
    private consumoService: ConsumoService) {
      Object.assign(this, { lineChartSeriesConsumo })
      Object.assign(this, { barChartConsumo })
  }

  ngOnInit() {
    this.clientId = window.localStorage.getItem('clientId');
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
    }
    this.getUnidadesConsumidoras()

  }

  getUnidadesConsumidoras(){
    this.commomService.getUnidadesConsumidoras(this.clientId).subscribe(response =>{
      this.listLojas = response.body.body[0].unidades_consumidoras
      this.getGraficoConsumo(this.listLojas[0]);
    })
  }

  async extractTable(uc) {
    this.preencheTable = []
    let loja = []
    loja = await this.getDadosConsumo(uc);
    if(!loja){
      let table = new Consumo();
      table.meses = null
      table.consumo = null
      table.projecao = null
      table.precisao = null
      this.preencheTable.push(table);
    }else{
      for (let i = 0; i < loja[0].meses.length; i++) {
          let table = new Consumo();
          table.meses = loja[0].meses[i]
          table.consumo = loja[0].consumo[i]
          table.projecao = loja[0].projecao[i]
          table.precisao = loja[0].precisao[i]
          this.preencheTable.push(table);
      }
    }
    this.dataSource = new MatTableDataSource(this.preencheTable);
}
    getGraficoConsumo(uc) {
      this.consumoService
          .get(`/consumov2`, uc)
          .subscribe((response) => {
              console.log(response.body);
              
              // this.listTableConsumo = response.body.Consumo;
              // this.atualizaGrafico(this.listLojas[0])
              // this.extractTable();
          })
  }

  async atualizaGrafico(uc: string){
      this.barras = [];
      this.barChartConsumo = [];
      this.linhaMedia=[]
      this.lineChartSeriesConsumo.forEach(linha=>{
          linha.series = []
      })
      this.extractTable(uc);
      let loja = await this.getDadosConsumo(uc);
      if(!loja){
        return
      }
      for (let i = 0; i < loja[0].meses.length; i++) {
          let barra = new PreencheGrafico();
          let linhaRazao = new PreencheGrafico();
          
          this.razao = loja[0].projecao[i];;
          barra.name = loja[0].meses[i];
          linhaRazao.name = barra.name
          barra.value = loja[0].consumo[i];
          linhaRazao.value = this.razao;
          
          this.linhaMedia.push(linhaRazao)
          this.barras.push(barra);
      }
      this.barChartConsumo = this.barras;
      this.lineChartSeriesConsumo.forEach(linha =>{
          if(linha.name.includes("Projeção")){
              linha.series = this.linhaMedia;
          }
      })
      this.lineChartSchemeConsumo.domain = ['#52b5eb','#116db3',]
  }

  getDadosConsumo(uc): any{
    return new Promise((resolve)=> {this.consumoService.get('/consumov2', uc)
    .subscribe(response => {
        resolve(response.body.Consumo);
        });
    });
  }

}
