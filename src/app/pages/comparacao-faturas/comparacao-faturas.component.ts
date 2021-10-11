import { CommomService } from 'src/app/services/commom.service';
import { Component, OnInit } from '@angular/core';
import { Unidade } from 'src/app/_models/unidade';
import { ComparacaoFaturasService } from './comparacao-faturas.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ComparacaoFaturas } from 'src/app/_models/comparacao-faturas';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';

@Component({
  selector: 'vex-comparacao-faturas',
  templateUrl: './comparacao-faturas.component.html',
  styleUrls: ['./comparacao-faturas.component.scss']
})
export class ComparacaoFaturasComponent implements OnInit {

  // options
  tarifas: boolean = false;
  impostos: boolean = false;
  bandeira: boolean = false;

  ucSelecionado: string;
  valor: string = "0,00";
  data: string = "";
  result: string;

  listMes = [];
  clientId: string;
  listLojas: any = [];
  unidade = new Unidade();

  displayedColumns: string[] = [
    "CampoRessarcido",
    "Valor"
  ];
  dataSource: MatTableDataSource<ComparacaoFaturas>;
  listTableGD: any[] = [];
  preencheTable: ComparacaoFaturas[] = [];

  constructor(private commomService: CommomService, private dialog: MatDialog, private comparacaoFaturasService: ComparacaoFaturasService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.clientId = window.localStorage.getItem('clientId');
    var retornoValida = this.commomService.validaSessao();
    if (!retornoValida) {
      this.router.navigate(['login']);
      return;
    }
    this.getUnidadesConsumidoras()
    this.getData12Meses()
  }

  renderizarModal() {
    this.dialog.open(DemoDialogComponent2, {
      disableClose: false,
      width: '900px',
    }).afterClosed().subscribe(result => {
      this.result = result;
    });
  }

  getUnidadesConsumidoras() {
    this.commomService.getUnidadesConsumidoras(this.clientId).subscribe(response => {
      this.listLojas = response.body.body[0].unidades_consumidoras
    })
  }

  async setStatus(uc) {
    let total = 0;
    this.preencheTable = []
    this.comparacaoFaturasService.uc = uc;
    this.ucSelecionado = uc ? uc : this.ucSelecionado;
    if (this.ucSelecionado) {
      let compare = await this.getStatus(this.ucSelecionado);
      console.log(compare);
      if(compare.Valor){
        for (let i = 0; i < compare?.Valor.length; i++) {
  
          let table = new ComparacaoFaturas();
  
          table.campoRessarcido = compare.CampoRessarcido[i];
          table.valor = compare.Valor[i];
          this.data = compare.Data[1] + " à " + compare.Data[0];
          total += compare.Valor[i];
          this.valor = total.toFixed(2).toString().replace(".", ",");
          this.preencheTable.push(table);
        }
      }
      if (!compare || !compare.Valor) {
        this.preencheTable = []
        this.valor = '0,00'
      }
      this.dataSource = new MatTableDataSource(this.preencheTable);
    }

  }
  divergencias(tarifas: boolean, impostos: boolean, bandeira: boolean) {
    tarifas ? this.tarifas = true : this.tarifas = false
    impostos ? this.impostos = true : this.impostos = false
    bandeira ? this.bandeira = true : this.bandeira = false
  }

  getStatus(uc): any {
    return new Promise((resolve) => {
      this.comparacaoFaturasService.get(environment.comparacaoFaturas, uc)
      .subscribe(response => {
        resolve(response.body);
      });
    });
  }

  getData12Meses() {
    let ultimos5Meses = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];

    //Pega os ultimos 5 meses
    ultimos5Meses.forEach((data, index) => {
      data.setDate(1);
      new Date(data.setMonth(data.getMonth() - (index)))
    });

    //Formata as datas 
    ultimos5Meses.forEach(data => this.listMes.push(this.commomService.formatDate(data).substring(3)));
  }
}
@Component({
  selector: 'vex-components-overview-demo-dialog',
  template: `
      <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
          <div style="font-family:Nunito;font-weight: bolder;">COMPARAÇÃO DE FATURAS</div>
          <button type="button" mat-icon-button (click)="close('No answer')" tabindex="-1">
              <mat-icon [icIcon]="icClose"></mat-icon>
          </button>
      </div>

      <mat-dialog-content style="text-align: left; font-family:Nunito;">
      <p>Você está prestes a contratar o serviço de Comparação de Faturas.</p>
      <p>A Economizenergia irá realizar todos os processos necessários, englobando o escopo do contrato assinado pelo contratante.</p>
         
          <br><br>
          </mat-dialog-content>
          <p style="font-family:Nunito;">Ao clicar em "Contratar" o processo será iniciado.</p>


      <mat-dialog-actions align="end">
          <button mat-raised-button (click)="close('No')">Cancelar</button>
          <button mat-raised-button color="primary" (click)="enviar()">Contratar</button>
      </mat-dialog-actions>
  `
})
export class DemoDialogComponent2 implements OnInit {

  icClose = icClose;
  economiaAnual: string = "";
  clientId: string;

  constructor(private dialogRef: MatDialogRef<DemoDialogComponent2>, private router: Router, private comparacaoFaturasService: ComparacaoFaturasService) {
  }
  ngOnInit(): void {
    this.clientId = window.localStorage.getItem('clientId');
  }

  enviar() {
    this.close('Yes');
    this.comparacaoFaturasService.mailing(this.clientId);
  }
  close(answer: string) {
    this.dialogRef.close(answer);
  }
}