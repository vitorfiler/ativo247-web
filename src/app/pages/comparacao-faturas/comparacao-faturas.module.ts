import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsOverviewDialogsModule } from '../components-overview-dialogs/components-overview-dialogs.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
import { HighlightModule } from 'src/@vex/components/highlight/highlight.module';
import { DemoDialogComponent2 } from './comparacao-faturas.component';



@NgModule({
  declarations: [DemoDialogComponent2],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    IconModule,
    HighlightModule,
    MatTabsModule,
    MatButtonModule,
    FlexLayoutModule,
    ComponentsOverviewDialogsModule
  ],
  entryComponents: [DemoDialogComponent2]
})
export class ComparacaoFaturasModule { }
