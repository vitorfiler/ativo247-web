import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { CommomService } from 'src/app/services/commom.service';
import { CalculoTributario } from 'src/app/_models/calculo-tributario';
import { ComparacaoFaturas } from 'src/app/_models/comparacao-faturas';
import { Unidade } from 'src/app/_models/unidade';
import { environment } from 'src/environments/environment';
import { DemoDialogComponent2 } from '../comparacao-faturas/comparacao-faturas.component';
import { ComparacaoFaturasService } from '../comparacao-faturas/comparacao-faturas.service';
import { CalculoTributarioService } from './calculo-tributario.service';

@Component({
	selector: 'vex-calculo-tributario',
	templateUrl: './calculo-tributario.component.html',
	styleUrls: ['./calculo-tributario.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class CalculoTributarioComponent implements OnInit {

	data: string = "";
	valor: string = "0,00";

	listMes = [];
	clientId: string;
	listLojas: any = [];
	unidade = new Unidade();
	load: boolean = false;
	displayedColumns: string[] = [
		"Oportunidades",
		"Valor"
	];
	dataSource: MatTableDataSource<CalculoTributario>;
	listTableGD: any[] = [];
	preencheTable: CalculoTributario[] = [];

	constructor(private commomService: CommomService, private router: Router, private calculoTributarioService: CalculoTributarioService) {
	}

	ngOnInit(): void {
		this.clientId = window.localStorage.getItem('clientId');
		var retornoValida = this.commomService.validaSessao();
		if (!retornoValida) {
			this.router.navigate(['login']);
			return;
		}
		this.getUnidadesConsumidoras();

	}

	getUnidadesConsumidoras() {
		this.load = true
		this.commomService.getUnidadesConsumidoras(this.clientId).subscribe(response => {
			this.load = false;
			this.listLojas = response.body.body[0].unidades_consumidoras
		},
		(error) => {
			this.load = false;
			console.log(error.message);
			// this.snackbar.open(MessagesSnackBar.LOGIN_ERRO, 'Close', { duration: 9000 });
		});
	}

	// getStatus(uc): any {
	// 	return new Promise((resolve) => {
	// 		this.calculoTributarioService.get("/calculo_tributario",uc)
	// 			.subscribe(response => {
	// 				resolve(response);
	// 			});
	// 	});
	// }

	async setStatus(uc) {
		console.log(uc);

		let total = 0.0;
		this.preencheTable = []
		this.load = true;
		// this.getStatus(uc)
		this.calculoTributarioService.getCalculoTributario(uc)
			.subscribe(response => {
				console.log(response);
				this.load = false;
				if (response) {
					this.data = response.body.datas[0] + " a " + response.body.datas[1];
					response.body.oportunidades.forEach((element, index, array) => {
						let table = new CalculoTributario();
						table.oportunidade = element.oportunidade;
						table.valor = element.valor ? element.valor.toFixed(2).toString().replace(".", ",") : "-";
						total += element.valor;
						if (index === (array.length - 1)) {
							table.oportunidade = "Total ";
							table.valor = total ? total.toFixed(2).toString().replace(".", ",") : "-";
						}
						this.preencheTable.push(table);
					});
				}

				// if (!response || !response.Valor) {
				//   this.preencheTable = []
				//   this.valor = '0,00'
				// }
				this.dataSource = new MatTableDataSource(this.preencheTable);

			},
			(error) => {
				this.load = false;
				console.log(error.message);
				// this.snackbar.open(MessagesSnackBar.LOGIN_ERRO, 'Close', { duration: 9000 });
			});
	}
}
