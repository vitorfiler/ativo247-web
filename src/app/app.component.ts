import { Component, Inject, LOCALE_ID, Renderer2, OnInit } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icDateRange from '@iconify/icons-ic/twotone-date-range';

import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import { CommomService } from 'src/app/services/commom.service';


@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'vex';

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private commomService: CommomService,
    private router: Router) {
      Settings.defaultLocale = this.localeId;
      
      if (this.platform.BLINK) {
        this.renderer.addClass(this.document.body, 'is-blink');
      }
      
    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    showConfigButton: false,
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));
    this.navigationService.items = [
      {
        label: 'Dashboard',
        type: 'link',
        route: '/dashboard',
        class_icon: 'dashboard_menu_icon'
      },
      {
        label: 'Unidades Consumidoras',
        type: 'link',
        route: '/unidades',
        class_icon: 'unidades_consumidoras_menu_icon'
        
      },
      {
        label: 'Financeiro',
        type: 'link',
        route: '/financeiro',
        class_icon: 'financeiro_menu_icon'
      },
      {
        label: 'Consumo',
        type: 'link',
        route: '/consumo',
        class_icon: 'consumo_menu_icon'
      },
      {
        label: 'Crédito de G.D',
        type: 'link',
        route: '/credito-gd',
        class_icon: 'credito_de_gd_menu_icon'
      },
      {
        label: 'Simulador de G.D',
        type: 'link',
        route: '/simulador-gd',
        class_icon: 'simulador_de_gd_menu_icon'
      },
      {
        label: 'Gráfico de Demanda',
        type: 'link',
        route: '/grafico-demanda',
        class_icon: 'grafico_de_demanda_menu_icon'
      },

      // {
      //   label: 'Gestão de Energia',
      //   type: 'link',
      //   route: '/gestao-energia',
      //   icon: icAssigment
      // },
      {
        label: 'Comparação de Faturas',
        type: 'link',
        route: '/comparacao-faturas',
        class_icon: 'gestao_de_energias_e_faturas_menu_icon'
      },
      {
        label: 'Mudança Tarifária',
        type: 'link',
        route: '/mudanca-tarifaria',
        class_icon: 'mudanca_tarifaria_menu_icon'
      },
      {
        label: 'Cálculo Tributário',
        type: 'link',
        route: '/calculo-tarifario',
        class_icon: 'calculo_tributario_menu_icon'
      },
      {
        label: 'Mercado Livre',
        type: 'link',
        route: '/mercado-livre',
        class_icon: 'mercado_livre_menu_icon'
      }

    ];
  }
  ngOnInit(): void {
    let token = window.localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }
  }
}
