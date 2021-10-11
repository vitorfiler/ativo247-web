import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { Finalizado, NaoRealizado, Protocolado, Status, StatusCor } from 'src/app/_models/status';
import { GestaoEnergiaService } from './gestao-energia.service';

@Component({
  selector: 'vex-gestao-energia',
  templateUrl: './gestao-energia.component.html',
  styleUrls: ['./gestao-energia.component.scss']
})
export class GestaoEnergiaComponent implements OnInit {

  status1 = new Status();
  status2 = new Status();
  status3 = new Status();
  status4 = new Status();
  status5 = new Status();
  status6 = new Status();
  processos: any[] = []
  statusCor = new Status();
  constructor(private gestaoEnergiaService: GestaoEnergiaService, private router: Router,
    private commomService: CommomService) { }

  ngOnInit(): void {
    var retornoValida  = this.commomService.validaSessao();
    if(!retornoValida){
        this.router.navigate(['login']);
        return;
    }
    this.getStatus();
  }
  setStatusCor(objStatus = new Status(), status: number): Status{
      let naoRealizado = new NaoRealizado();
      let protocolado =  new Protocolado();
      let finalizado =  new Finalizado();
      switch (status) {
        case 0: 
          objStatus.naoRealizado = naoRealizado.naoRealizado
          objStatus.protocolado = naoRealizado.protocolado
          objStatus.finalizado = naoRealizado.finalizado
          break;
        case 1: 
          objStatus.naoRealizado = protocolado.naoRealizado
          objStatus.protocolado = protocolado.protocolado
          objStatus.finalizado = protocolado.finalizado
          break;
        case 2: 
          objStatus.naoRealizado = finalizado.naoRealizado
          objStatus.protocolado = finalizado.protocolado
          objStatus.finalizado = finalizado.finalizado
          break;
        default: 
          objStatus.naoRealizado = naoRealizado.naoRealizado
          objStatus.protocolado = naoRealizado.protocolado
          objStatus.finalizado = naoRealizado.finalizado
          break;
    }
    return objStatus;
  }
  getStatus(){
      let clientId = localStorage.getItem("clientId");
      this.gestaoEnergiaService.getStatus(clientId).subscribe(response => {
            this.processos = response.body.processos
            console.log(this.processos);
            let index = 1
            this.processos.forEach(processo =>{
                this['status'+ index].status = processo.Status
                this['status'+ index].nome = processo.Name
                this['status'+ index].valor = processo.Valor
                this['status'+ index].protocolo = processo.Protocolo
                console.log(processo.Protocolo)
                this.setStatusCor(this['status'+ index], processo.Status);
                // console.log(this['status'+ index]);
                index++
            })
      })
  }
}
