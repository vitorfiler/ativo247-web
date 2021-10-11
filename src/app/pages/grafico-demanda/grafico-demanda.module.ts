import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsOverviewDialogsModule } from '../components-overview-dialogs/components-overview-dialogs.module';
import { DemoDialogComponent } from './grafico-demanda.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
import { HighlightModule } from 'src/@vex/components/highlight/highlight.module';



@NgModule({
  declarations: [DemoDialogComponent],
  imports: [
    CommonModule,
    ComponentsOverviewDialogsModule,
    FlexLayoutModule,
    MatTabsModule,
    HighlightModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    IconModule
  ],
  // exports: [ComponentsOverviewDialogsComponent],
  entryComponents: [DemoDialogComponent]
})
export class GraficoDemandaModule { }
