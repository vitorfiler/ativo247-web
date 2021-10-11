import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LineChartComponent } from '@swimlane/ngx-charts';
import { CommomService } from 'src/app/services/commom.service';
import { PreencheGrafico } from 'src/app/_models/barras';
import { Table, TableDashboard } from 'src/app/_models/table';
import { Unidade } from 'src/app/_models/unidade';
import { consumo1 } from './data';
import { consumo2 } from './data';
import { demanda1 } from './data';
import { demanda2 } from './data';
import { DashboardService } from './dashboard.service';
import { line1 } from './lineGauge1';
import { line2 } from './lineGauge2';

//STEP 2 - Defining the dataset for the angular gauge along with the color configuration
let thresholdConfig = {};

const GAUGE_1 = "1";
const GAUGE_2 = "2";
const ALL_GAUGE = "0";

@Component({
  selector: 'vex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(LineChartComponent, { static: false })
  private lineChartComponent: LineChartComponent;

  @ViewChild('mySelect1', { static: false }) mySelect1;
  @ViewChild('mySelect2', { static: false }) mySelect2;
  @ViewChild('mySelect3', { static: false }) mySelect3;

  grafic: Object;
  lojasStorage: any;
  lojas: any;
  loja: any;
  ucSelect1: string = "";
  ucSelect2: string = "";
  ucSelect3: string = "";
  previsao1: string = "";
  precisao1: string = "";
  previsao2: string = "";
  precisao2: string = "";
  previsao3: string = "";
  precisao3: string = "";
  tables1: Table[] = [];
  tables2: Table[] = [];
  tables3: Table[] = [];
  legendLine2: string = "Consumo"
  line1: any[] = line1
  line2: any[] = line2
  linhas1: any[] = [];
  linhas2: any[] = [];
  linhas3: any[] = [];
  uc: string;
  unidade = new Unidade();
  unidades: Unidade[];
  listLojas: any = [];
  listMeses: any = [];
  listPta: any = [];
  listFpta: any = [];
  clientId: String = this.getClientID();
  consumo: number;
  displayedColumns: string[] = ["mes", "consumo", "demanda", "reativo", "valorTotal"];
  dataSource1: MatTableDataSource<Table>;
  dataSource2: MatTableDataSource<Table>;
  dataSource3: MatTableDataSource<Table>;
  jsonCoresGrafico1 = {};
  jsonCoresGrafico2 = {};
  jsonCoresGrafico3 = {};
  mesesFiltrados1: any[] = [{
      meses: [],
      consumo: [],
  }];
  mesesFiltrados2: any[] = [{
      meses: [],
      consumo: [],
  }];
  mesesFiltrados3: any[] = [{
      meses: [],
      consumo: [],
  }];
  listMes = [];
  mesSelecionado: string;
  ucSelecionado: string;
  disableEditar: boolean = true;
  consumoPrecisaoEsquerda: number = 0
  consumoPrecisaoDireita: number = 0
  valorTotalPrecisaoEsquerda: number = 0
  valorTotalPrecisaoDireita: number = 0

//   single: any[];
//   public view: any[] = [250, 250];
//   public showXAxis = true;
//   public showYAxis = true;
//   public gradient = false;
//   public showLegend = false;
//   public showXAxisLabel = true;
//   public xAxisLabel: "Years";
//   public showYAxisLabel = true;
//   public yAxisLabel: "Salary";
//   public graphDataChart: any[];
//   public colorScheme = {
//       domain: ['#0068B0']
//   };

  consumo1: any[];
  consumo2: any[];
  demanda1: any[];
  demanda2: any[];
  view: any[] = [300, 170];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabelConsumo: string = 'Consumo [kWh]';
  xAxisLabelFatura: string = 'Fatura Energia [R$/mês]';
  xAxisLabelReativo: string = 'Consumo Reativo [kVArh]';
  xAxisLabelDemanda: string = 'Demanda [kW]';
  showYAxisLabel: boolean = false;
  yAxisLabel: string = 'Competência';
  legendTitle: string = 'Legenda';

  colorScheme = {
    domain: ['#116db3', '#116db3']
  };
  constructor(private commomService: CommomService, public dashboardService: DashboardService, private router: Router) {
      Object.assign(this, { line1 })
      Object.assign(this, { line2 })
      Object.assign(this, { consumo1 })
      Object.assign(this, { consumo2 })
      Object.assign(this, { demanda1 })
      Object.assign(this, { demanda2 })
  }

  editar(){
      localStorage.setItem('ucSelecionado', this.ucSelecionado);    
      localStorage.setItem('mesSelecionado', this.mesSelecionado); 
  }
  
  getClientID(){
      var nome = localStorage.getItem('clientId');
      if (nome == null) {
          return "";
      }
      return nome.replace('"', '').replace('"', '');
  }

  async extractTable(uc: string, gauge: string, mes: string) {
      let id = Number(gauge);

      if (!id) {
          for (let i = 1; i < 4; i++) {
              if (!this["tables" + i].length) {
                  id = i;
                  break;
              }
          }
      }

      this["tables" + id] = [];

    //   const loja = this.listLojas.find((l) => l.uc == uc);
      let loja = await this.getDataDashboard(uc, mes);
      console.log(loja[0].meses);
      
      for (let i = 0; i < loja[0].meses.length; i++) {
          let table = new TableDashboard();
          table.meses = loja[0].meses[i];
          table.consumo = loja[0].consumo[i];
          table.demanda = loja[0].demanda[i];
          table.reativo = loja[0].reat[i];
          table.valorTotal = loja[0].valor_total[i];

          this["tables" + id].push(table);

      }

      this["dataSource" + id] = new MatTableDataSource(this["tables" + id]);
  }
  gaugeType = "arch";
  gaugeLabel = "";
  gaugeAppendText = "kWh";

  onSubmit(event){
    
  }

  async gauge(id: string, uc: string, mes?: string) {

      let loja;

      this.ucSelecionado = uc ? uc : this.ucSelecionado;
      this.mesSelecionado = mes ? `${mes.substring(3,7)}-${mes.substring(0,2)}-01` : this.mesSelecionado// : `${(new Date()).getFullYear}-${(new Date()).getMonth}-01`;   


      if ((this.ucSelecionado) && (this.mesSelecionado)){
        this.consumo1 = []
        this.consumo2 = []
        this.demanda1 = []
        this.demanda2 = []
        //this.listLojas = [];
        this.disableEditar = false;
        loja = await this.getDataDashboard(this.ucSelecionado, this.mesSelecionado);
        
        //preencher barra Anterior Faturado e Atual Faturado no primeiro gráfico de Consumo
            consumo1[0].series[0].value = loja[0].consumo[0]
            consumo1[1].series[0].value = loja[0].consumo[1]
            consumo1[0].series[1].value = loja[0].consumo_projecao[0]
            consumo1[1].series[1].value = loja[0].consumo_projecao[1]
        //preencher barra Anterior Faturado e Atual Faturado no segundo gráfico de Consumo
            consumo2[0].series[0].value = loja[0].valor_total[0]
            consumo2[1].series[0].value = loja[0].valor_total[1]
            consumo2[0].series[1].value = loja[0].valor_total_projecao[0]
            consumo2[1].series[1].value = loja[0].valor_total_projecao[1]
        //preencher barra Anterior Faturado e Atual Faturado no primeiro gráfico de Demanda
            demanda1[0].series[0].value = loja[0].demanda[0]
            demanda1[1].series[0].value = loja[0].demanda[1]
            demanda1[0].series[1].value = 0
            demanda1[1].series[1].value = 0
        //preencher barra Anterior Faturado e Atual Faturado no segundo gráfico de Demanda
            demanda2[0].series[0].value = loja[0].reat[0]
            demanda2[1].series[0].value = loja[0].reat[1]
            demanda2[0].series[1].value = 0
            demanda2[1].series[1].value = 0
        //preencher porcentagens do consumo da esquerda 
            this.consumoPrecisaoEsquerda = loja[0].consumo_precisao[0]
            this.consumoPrecisaoDireita = loja[0].consumo_precisao[1]
        //preencher porcentagens do consumo da direita
            this.valorTotalPrecisaoEsquerda = loja[0].valor_total_precisao[0]
            this.valorTotalPrecisaoDireita = loja[0].valor_total_precisao[1]

        this.consumo1 = consumo1
        this.consumo2 = consumo2
        this.demanda1 = demanda1
        this.demanda2 = demanda2
        
        this.listLojas.forEach((element) => {
          if (uc == element.uc) {
            if (this.isGauge1(id)) {
              this.dashboardService.consumoGauge1 = Number(loja[0].consumo[1]);
              this.dashboardService.max1 = element.max;
              this.previsao1 = element.previsao;
              this.precisao1 = element.precisao;
              this.rangeCores(element.meta, element.alerta, element.max, id);
            }
            if (this.isGauge2(id)) {
                
              this.dashboardService.consumoGauge2 = Number(loja[0].valor_total[1]);
              this.dashboardService.max2 = element.max;
              this.previsao2 = element.previsao;
              this.precisao2 = element.precisao;
              this.rangeCores(element.meta, element.alerta, element.max, id);
            }
            if (this.isDefault(id)) {
              this.dashboardService.consumoGauge1 = Number(loja[0].consumo[0]);
              this.dashboardService.consumoGauge2 = Number(loja[0].consumo[1]);
              this.formatDisplayValue(
                  this.dashboardService.consumoGauge1
              );
              this.formatDisplayValue(
                  this.dashboardService.consumoGauge2
              );
              this.dashboardService.max1 = element.max;
              this.dashboardService.max2 = element.max;
              this.previsao1 = element.previsao;
              this.precisao1 = element.precisao;
              this.previsao2 = element.previsao;
              this.precisao2 = element.precisao;
              this.rangeCores(element.meta, element.alerta, element.max, id);
            }
            this.extractTable(element.uc, id, this.mesSelecionado); 
          }
          if (this.isDefault(id)) this.extractTable(uc, id, this.mesSelecionado);
        });
      }

      if(id == '1') { this.gauge('2', uc, mes)}
  }

  carregaBarras(loja){
    consumo1[0].series[0].value = loja[0].consumo[0]
    consumo1[1].series[0].value = loja[0].consumo[1]
  }
  isGauge1(id: string) {
      if (id == GAUGE_1) {
          return true;
      }
      return false;
  }
  isGauge2(id: string) {
      if (id == GAUGE_2) {
          return true;
      }
      return false;
  }
  isDefault(id: string) {
      if (id == ALL_GAUGE) {
          return true;
      }
      return false;
  }

  formatDisplayValue(value: Number, thousand: string = ""): string {
      if (value == undefined) return;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
  }

  rangeCores(meta: string, alerta: string, max: string, Id: string) {
      thresholdConfig = {
          "0": { color: "#116db3" },
          "1": { color: "#116db3" },
          [meta]: { color: "#116db3" },
          [alerta]: { color: "#116db3" },
      };
      if(Id == '1'){
          this.jsonCoresGrafico1 = thresholdConfig;
          this.dashboardService.thresholds1 = thresholdConfig;
      }
      if(Id == '2'){
          this.jsonCoresGrafico2 = thresholdConfig;
          this.dashboardService.thresholds2 = thresholdConfig;
      }
      
      return thresholdConfig;
  }

  getDataDashboard(uc, mes): any{
    return new Promise((resolve)=> {this.dashboardService.get('/dashboard', uc, mes)
    .subscribe(response => {
        resolve(response.body.Dashboard);
        });
    });
  }

  getData12Meses(){
    let ultimos5Meses = [new Date(),new Date(),new Date(),new Date(),new Date(),new Date(),new Date(),new Date(),new Date(),new Date(),new Date(),new Date()];

    //Pega os ultimos 5 meses
    ultimos5Meses.forEach((data, index) => {
      data.setDate(1);
      new Date(data.setMonth(data.getMonth() - (index)))
    });

    //Formata as datas 
    ultimos5Meses.forEach(data => this.listMes.push(this.commomService.formatDate(data).substring(3)));
  }

  ngOnInit() {
    
    this.getData12Meses();
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
      }   
    this.lojasStorage = localStorage.getItem("Consumo");
    this.lojas = JSON.parse(this.lojasStorage);
    this.lojas.Unidades.forEach((element: any) => {
        this.listLojas.push(element);
    });
    if(this.listLojas.length > 3){
        this.gauge("1", this.listLojas[0].uc);
        // this.atualizaGraficos(this.listLojas[0].uc,"1");
        this.ucSelect1 = this.listLojas[0].uc;
        this.gauge("2", this.listLojas[1].uc);
        // this.atualizaGraficos(this.listLojas[1].uc,"2");
        this.ucSelect2 = this.listLojas[1].uc;
    }
    else if(this.listLojas.length == 2){
        this.gauge("1", this.listLojas[0].uc);
        // this.atualizaGraficos(this.listLojas[0].uc,"1");
        this.ucSelect1 = this.listLojas[0].uc;
        //this.mySelect1.select(this.listLojas[0].uc);
        this.gauge("2", this.listLojas[1].uc);
        // this.atualizaGraficos(this.listLojas[1].uc,"2");
        this.ucSelect2 = this.listLojas[1].uc;
    }
    else if(this.listLojas.length == 1){
        this.gauge("1", this.listLojas[0].uc);
        // this.atualizaGraficos(this.listLojas[0].uc,"1");
        this.ucSelect1 = this.listLojas[0].uc;
        this.gauge("2", this.listLojas[0].uc);
        // this.atualizaGraficos(this.listLojas[0].uc,"2");
        this.ucSelect2 = this.listLojas[0].uc;
    }
  }

}
