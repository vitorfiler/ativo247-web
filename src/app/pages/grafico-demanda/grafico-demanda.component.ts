import { Component, OnInit } from "@angular/core";
import { GraficoDemandaService } from "./grafico-demanda.service";
import { single } from './data';
import { multi } from './data';
import { barChart } from './data';
import { lineChartSeries } from './data';
import icClose from '@iconify/icons-ic/twotone-close';

import { CommomService } from './../../services/commom.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PreencheGrafico } from 'src/app/_models/barras';
import { Unidade } from 'src/app/_models/unidade';
import { ComponentsOverviewDialogsComponent } from '../components-overview-dialogs/components-overview-dialogs.component';
import { EventEmitterService } from 'src/app/services/event.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SimulacaoTarifaService } from '../simulacao-tarifaria/simulacao-tarifa.service';

@Component({
    selector: "app-grafico-demanda",
    templateUrl: "./grafico-demanda.component.html",
    styleUrls: ["./grafico-demanda.component.scss"],
})
export class GraficoDemandaComponent implements OnInit {
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
    yAxisLabel = 'Demanda [kWh]';
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
    yAxisLabelRight: string = 'Demanda [kWh]';

    result: string;

    constructor(private commomService: CommomService, private graficoDemandaService: GraficoDemandaService, private router: Router,
        private dialog: MatDialog, public simulacaoTarifaService: SimulacaoTarifaService) {
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
    }

    renderizarModal() {
        this.dialog.open(DemoDialogComponent, {
            disableClose: false,
            width: '900px',
        }).afterClosed().subscribe(result => {
            this.result = result;
        });
    }

    async abrirModal() {
        let uc = window.localStorage.getItem('ucDemanda');
        let demandaIdeal = await this.getDadosTarifa(uc)
        console.log(demandaIdeal.economia_anual);
        window.localStorage.setItem('economiaAnual', demandaIdeal.economia_anual)

        this.renderizarModal();
    }
    getDadosTarifa(uc): any {
        return new Promise((resolve) => {
            this.simulacaoTarifaService.get('/demIDEAL', uc)
            .subscribe(response => {
                resolve(response.body.Unidades);
            });
        });
    }
    atualizaGrafico(uc: string) {
        window.localStorage.setItem('ucDemanda', uc);
        const loja = this.listDemanda.find((l) => l.uc == uc);
        console.log(loja);
        this.simulacaoTarifaService.uc = uc;
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
        this.media = loja.media_fpta;
        for (let i = 0; i < loja.dem_fpta.length; i++) {
            if (loja.dem_fpta[i] > this.maior) {
                this.maior = loja.dem_fpta[i]
            }
        }

        for (let i = 0; i < loja.meses.length; i++) {
            let barra = new PreencheGrafico();
            let linhaDemanda = new PreencheGrafico();
            let linhaMedia = new PreencheGrafico();
            let linhaMax = new PreencheGrafico();

            barra.name = loja.meses[i];
            linhaDemanda.name = barra.name
            linhaMedia.name = barra.name
            linhaMax.name = barra.name

            barra.value = loja.dem_fpta[i];
            linhaDemanda.value = this.demanda[i];
            linhaMedia.value = this.media;

            linhaMax.value = this.maior;

            this.linhaDemanda.push(linhaDemanda)
            this.linhaMedia.push(linhaMedia)
            this.linhaMaiorDemanda.push(linhaMax)
            this.barras.push(barra);
        }
        this.barChart = this.barras;
        console.log(this.linhaMedia);
        console.log(this.lineChartSeries);
        this.lineChartSeries.forEach(linha => {
            if (linha.name=="Demanda Contratada [kW]") {
                linha.series = this.linhaDemanda;
            }
            if (linha.name =="Demanda Faturada Média [kW]") {
                linha.series = this.linhaMedia;
            }
            // if (linha.name=="Demanda Faturada [kW]") {
            //     linha.series = this.linhaMaiorDemanda;
            // }
        });
        console.log(this.lineChartSeries);
        this.lineChartScheme.domain = ['#0a3e67', '#00acec']
    }

    onSelect(event) {
    }

    getDemanda() {

        let clientId = localStorage.getItem("clientId");
        this.graficoDemandaService
            .getDemanda(clientId)
            .subscribe(response => {
                console.log(response);
                this.listDemanda = response.body.Unidades;

                this.listDemanda.forEach(demanda => {
                    this.listLojas.push(demanda.uc);

                })
                this.atualizaGrafico(this.listLojas[0]);
            })
    }
}

@Component({
    selector: 'vex-components-overview-demo-dialog',
    template: `

        <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
            <div style="font-family:Nunito;font-weight: bolder;">DEMANDA IDEAL</div>
          <button type="button" mat-icon-button (click)="close('No answer')" tabindex="-1">
              <mat-icon [icIcon]="icClose"></mat-icon>
          </button>
        </div>

        <mat-dialog-content style="text-align: left; font-family:Nunito;">
            <p>Foi encontrada uma economia administrativa de {{economiaAnual}}.</p>
            <br/>
            <p >Ao clicar em contratar, a empresa será passível de cobrança de acordo
            com o contrato com a Economizenergia.</p> 
            <p >Todos os valores serão demonstrados a seguir
            e serão realizados pela Economizenergia.</p>
            <br><br>
        </mat-dialog-content>
        <p style="font-family:Nunito;">Ao clicar em "Contratar" o processo será iniciado.</p>
  
        <mat-dialog-actions align="end">
            <button mat-raised-button (click)="close('No')">Cancelar</button>
            <button mat-raised-button color="primary" (click)="enviar()">Contratar</button>
        </mat-dialog-actions>
    `
})
export class DemoDialogComponent implements OnInit {

    icClose = icClose;
    economiaAnual: string = "";
    constructor(private dialogRef: MatDialogRef<DemoDialogComponent>, private router: Router) {
    }
    ngOnInit(): void {
        this.economiaAnual = window.localStorage.getItem('economiaAnual')
    }

    enviar() {
        this.close('Yes');
        this.router.navigate(['/simulacao-tarifaria'])
    }
    close(answer: string) {
        this.dialogRef.close(answer);
    }
}
