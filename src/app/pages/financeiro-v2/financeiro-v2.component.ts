import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { PreencheGrafico } from 'src/app/_models/barras';
import { Financeiro } from 'src/app/_models/financeiro';
import { Unidade } from 'src/app/_models/unidade';
import { barChart, lineChartSeries } from './data';
import { GraficoDemandaService } from './grafico-demanda.service';


@Component({
    selector: 'vex-financeiro-v2',
    templateUrl: './financeiro-v2.component.html',
    styleUrls: ['./financeiro-v2.component.scss']
})
export class FinanceiroV2Component implements OnInit {
    single: any[];
    multi: any[];
    unidade = new Unidade();
    // view: any[] = [700, 400];
    lojasStorage: any;
    lojas: any;
    listLojas: any = [];
    listDemanda: any[] = [];
    barras: any[] = [];
    linhaDemanda: any[] = [];
    linhaMedia: any[] = [];
    linhaMaiorDemanda: any[] = [];
    demandaContratada: number = 0;
    media: number = 0;
    demanda: number = 0;
    maior: number = 0;

    // options combo
    view = [700, 400];
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    legendTitle = 'Legenda';
    legendPosition = 'below';//'right';
    showXAxisLabel = true;
    showYAxisLabel = true;
    yAxisLabel = 'VALOR BRUTO [R$]';
    xAxisLabel = 'COMPETÊNCIA';
    showGridLines = true;
    innerPadding = '10%';
    animations: boolean = true;
    barChart: any[] = barChart;
    lineChartSeries: any[] = lineChartSeries;
    lineChartScheme = {
        name: 'coolthree',
        selectable: true,
        group: 'Ordinal',
        domain: []
    };

    comboBarScheme = {
        name: 'singleLightBlue',
        selectable: true,
        group: 'Ordinal',
        domain: ['#1d75ab']
    };

    showRightYAxisLabel: boolean = true;
    yAxisLabelRight: string = ' R$/kWh';

    previsao: string = "";
    precisao: string = "";

    displayedColumns: string[] = ["mes", "ponta", "fpta"];
    dataSource: MatTableDataSource<Financeiro>;
    listTableFinanceiro: any;
    preencheTable: Financeiro[] = [];

    constructor(private commomService: CommomService, private graficoDemandaService: GraficoDemandaService, private router: Router) {
        Object.assign(this, { lineChartSeries })
        Object.assign(this, { barChart })
    }

    ngOnInit() {
        var retornoValida = this.commomService.validaSessao();
        if (!retornoValida) {
            this.router.navigate(['login']);
            return;
        }
        this.getDemanda();
        this.getFinanceiro();
    }
    extractTable() {

        this.previsao = this.listTableFinanceiro[0].previsao;
        this.precisao = this.listTableFinanceiro[0].precisao;
        for (let i = 0; i < this.listTableFinanceiro[0].meses.length; i++) {
            let table = new Financeiro();
            table.tipoDado = this.listTableFinanceiro[0].meses[i]
            table.consumo = this.listTableFinanceiro[0].consumo[i]
            table.valor = this.listTableFinanceiro[0].valores[i]
            // let valorFloat = parseFloat(table.valor.toFixed(2));
            let valor = +table.valor
            
            let valorFloat = valor.toFixed(2);
            table.valor = valorFloat
            this.preencheTable.push(table);
        }
        this.dataSource = new MatTableDataSource(this.preencheTable);
    }
    getFinanceiro() {
        let clientId = localStorage.getItem("clientId");
        this.graficoDemandaService
            .getFinanceiro(clientId)
            .subscribe((response) => {

                this.listTableFinanceiro = response.body.Financeiro;
                this.extractTable();
                // this.atualizaGraficoGeral();
                // this.atualizaGraficoProjecao();
            })
    }

    atualizaGrafico(uc: string) {
        const loja = this.listDemanda.find((l) => l.uc == uc);
        this.barras = [];
        this.barChart = [];
        this.linhaMaiorDemanda = []
        this.linhaMedia = []
        this.linhaDemanda = []
        this.lineChartSeries.forEach(linha => {
            linha.series = []
        })
        this.maior = 0;
        this.demanda = loja.dem_fpta_cont;

        // for (let i = 0; i < loja.consumo.length; i++) {
        //     if(loja.dem_fpta[i] > this.maior){
        //         this.maior = loja.dem_fpta[i]
        //     }
        // }
        for (let i = 0; i < loja.meses.length; i++) {
            let barra = new PreencheGrafico();
            let linhaDemanda = new PreencheGrafico();
            let linhaMedia = new PreencheGrafico();
            let linhaMax = new PreencheGrafico();

            this.media = loja.razao[i];
            barra.name = loja.meses[i];
            linhaDemanda.name = barra.name
            linhaMedia.name = barra.name
            linhaMax.name = barra.name

            barra.value = loja.valores[i];
            linhaDemanda.value = this.demanda;
            linhaMedia.value = this.media;

            linhaMax.value = this.maior;

            this.linhaDemanda.push(linhaDemanda)
            this.linhaMedia.push(linhaMedia)
            this.linhaMaiorDemanda.push(linhaMax)
            this.barras.push(barra);
        }
        this.barChart = this.barras;
        this.lineChartSeries.forEach(linha => {
            // if(linha.name.includes("Contratada")){
            //     linha.series = this.linhaDemanda;
            // }
            linha.series = this.linhaMedia;
            // if(linha.name.includes("Razão")){
            // }
            // if(linha.name.includes("Maior")){
            //     linha.series = this.linhaMaiorDemanda;
            // }
        })
        this.lineChartScheme.domain = ['#52b5eb', '#1d75ab']
    }

    onSelect(event) {
    }

    getDemanda() {

        let clientId = localStorage.getItem("clientId");
        this.graficoDemandaService
            .getFinanceiro(clientId)
            .subscribe(response => {

                this.listDemanda = response.body.Financeiro;

                this.atualizaGrafico(this.listLojas[0]);
            })
    }
}
