import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { CustomComponentsModule } from "../components/custom-components.module";
import { CustomPipesModule } from "../pipes/custom-pipes.module";

import { DialogEventsComponent } from "./dialog-events/dialog-events.component";
import { DialogGroupArtigosComponent } from "./dialog-group-artigos/dialog-group-artigos.component";
import { DialogGroupCapituloComponent } from "./dialog-group-capitulo/dialog-group-capitulo.component";
import { DialogGroupLivrosComponent } from "./dialog-group-livros/dialog-group-livros.component";
import { DialogGroupPesquisasComponent } from "./dialog-group-pesquisas/dialog-group-pesquisas.component";
import { DialogGroupQuemsomosComponent } from "./dialog-group-quemsomos/dialog-group-quemsomos.component";
import { DialogGroupTesesComponent } from "./dialog-group-teses/dialog-group-teses.component";
import { DialogNewsComponent } from "./dialog-news/dialog-news.component";
import { DialogRegisterCoordinatorComponent } from "./dialog-register-coordinator/dialog-register-coordinator.component";
import { DialogResearchGroupComponent } from "./dialog-research-group/dialog-research-group.component";
import { DialogGroupParceirosComponent } from './dialog-group-parceiros/dialog-group-parceiros.component';
import { DialogExtensaoEnsinoGroupComponent } from './dialog-extensao-ensino-group/dialog-extensao-ensino-group.component';

@NgModule({
  declarations: [
    DialogRegisterCoordinatorComponent,
    DialogResearchGroupComponent,
    DialogNewsComponent,
    DialogEventsComponent,
    DialogGroupQuemsomosComponent,
    DialogGroupArtigosComponent,
    DialogGroupCapituloComponent,
    DialogGroupLivrosComponent,
    DialogGroupPesquisasComponent,
    DialogGroupTesesComponent,
    DialogGroupParceirosComponent,
    DialogExtensaoEnsinoGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPipesModule,
    CustomComponentsModule,
    AngularEditorModule
  ],
  exports: [
    DialogRegisterCoordinatorComponent,
    DialogResearchGroupComponent,
    DialogNewsComponent,
    DialogEventsComponent,
    DialogGroupQuemsomosComponent,
    DialogGroupArtigosComponent,
    DialogGroupCapituloComponent,
    DialogGroupLivrosComponent,
    DialogGroupPesquisasComponent,
    DialogGroupTesesComponent
  ]
})
export class CustomDialogsModule { }
