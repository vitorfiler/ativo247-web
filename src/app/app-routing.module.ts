import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';

import { UnidadesComponent } from './pages/unidades/unidades.component';
import { FinanceiroComponent } from './pages/financeiro/financeiro.component';
import { CreditoGdComponent } from './pages/credito-gd/credito-gd.component';
import { SimuladorGdComponent } from './pages/simulador-gd/simulador-gd.component';
import { FinanceiroV2Component } from './pages/financeiro-v2/financeiro-v2.component';
import { GraficoDemandaComponent } from './pages/grafico-demanda/grafico-demanda.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { CadMetasComponent } from './pages/cad-metas/cad-metas.component';
import { GestaoEnergiaComponent } from './pages/gestao-energia/gestao-energia.component';
import { ComparacaoFaturasComponent } from './pages/comparacao-faturas/comparacao-faturas.component';
import { ComponentsOverviewDialogsComponent } from './pages/components-overview-dialogs/components-overview-dialogs.component';
import { SimulacaoTarifariaComponent } from './pages/simulacao-tarifaria/simulacao-tarifaria.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginFinalComponent } from './pages/login-final/login-final.component';
import { MudancaTarifariaComponent } from './pages/mudanca-tarifaria/mudanca-tarifaria.component';
import { CalculoTributarioComponent } from './pages/calculo-tributario/calculo-tributario.component';
import { MercadoLivreComponent } from './pages/mercado-livre/mercado-livre.component';


const routes: VexRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'unidades', component: UnidadesComponent },
      { path: 'financeiro', component: FinanceiroV2Component },
      { path: 'credito-gd', component: CreditoGdComponent },
      { path: 'simulador-gd', component: SimuladorGdComponent },
      { path: 'consumo', component: ConsumoComponent },
      { path: 'grafico-demanda', component: GraficoDemandaComponent },
      { path: 'cad-metas', component: CadMetasComponent },
      { path: 'gestao-energia', component: GestaoEnergiaComponent },
      { path: 'comparacao-faturas', component: ComparacaoFaturasComponent },
      { path: 'simulacao-tarifaria', component: SimulacaoTarifariaComponent },
      { path: 'mudanca-tarifaria', component: MudancaTarifariaComponent },
      { path: 'calculo-tarifario', component: CalculoTributarioComponent },
      { path: 'mercado-livre', component: MercadoLivreComponent }
    ],
  },
  { path: 'login', component: LoginFinalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
