import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoordenadorasComponent } from './coordenadoras/coordenadoras.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { EventosComponent } from './eventos/eventos.component';
import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CustomPipesModule } from '@app/shared/pipes/custom-pipes.module';
import { PesquisasComponent } from './grupos-pesquisa/pesquisas/pesquisas.component';
import { TesesComponent } from './grupos-pesquisa/teses/teses.component';
import { ArtigosComponent } from './grupos-pesquisa/artigos/artigos.component';
import { LivrosComponent } from './grupos-pesquisa/livros/livros.component';
import { CapitulosComponent } from './grupos-pesquisa/capitulos/capitulos.component';
import { QuemSomosGrupoComponent } from './grupos-pesquisa/quem-somos-grupo/quem-somos-grupo.component';
import { ParceirosComponent } from './grupos-pesquisa/parceiros/parceiros.component';
import { ExtensaoEnsinoComponent } from './grupos-pesquisa/extensao-ensino/extensao-ensino.component';

@NgModule({
  declarations: [AdminComponent, QuemSomosComponent, CoordenadorasComponent, GaleriaComponent, NoticiasComponent, EventosComponent, GruposPesquisaComponent, PesquisasComponent, TesesComponent, ArtigosComponent, LivrosComponent, CapitulosComponent, QuemSomosGrupoComponent, ParceirosComponent, ExtensaoEnsinoComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule, AngularEditorModule, CustomPipesModule],
  providers: [OnlyAdminUsersGuard],
})
export class AdminModule { }
