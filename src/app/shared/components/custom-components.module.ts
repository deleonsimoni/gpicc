import { NgModule } from "@angular/core";
import { CustomPipesModule } from "../pipes/custom-pipes.module";
import { CoordinatorCardComponent } from "./coordinator-card/coordinator-card.component";
import { NewsCardComponent } from './news-card/news-card.component';
import { EventsCardComponent } from './events-card/events-card.component';
import { CommonModule } from "@angular/common";
import { ResearchGroupCardComponent } from "./research-group-card/research-group-card.component";
import { GruposPesquisaPesquisasCardComponent } from './grupos-pesquisa-pesquisas-card/grupos-pesquisa-pesquisas-card.component';
import { GruposPesquisaTesesCardComponent } from './grupos-pesquisa-teses-card/grupos-pesquisa-teses-card.component';
import { GruposPesquisaArtigosCardComponent } from './grupos-pesquisa-artigos-card/grupos-pesquisa-artigos-card.component';
import { GruposPesquisaLivrosCardComponent } from './grupos-pesquisa-livros-card/grupos-pesquisa-livros-card.component';
import { GruposPesquisaCapitulosCardComponent } from './grupos-pesquisa-capitulos-card/grupos-pesquisa-capitulos-card.component';
import { GruposPesquisaQuemSomosCardComponent } from './grupos-pesquisa-quem-somos-card/grupos-pesquisa-quem-somos-card.component';
import { GruposPesquisaParceirosCardComponent } from './grupos-pesquisa-parceiros-card/grupos-pesquisa-parceiros-card.component';
import { GruposExtensaoEnsinoCardComponent } from './grupos-extensao-ensino-card/grupos-extensao-ensino-card.component';

@NgModule({
  imports: [
    CommonModule,
    CustomPipesModule
  ],
  declarations: [
    CoordinatorCardComponent,
    NewsCardComponent,
    EventsCardComponent,
    ResearchGroupCardComponent,
    GruposPesquisaPesquisasCardComponent,
    GruposPesquisaTesesCardComponent,
    GruposPesquisaArtigosCardComponent,
    GruposPesquisaLivrosCardComponent,
    GruposPesquisaCapitulosCardComponent,
    GruposPesquisaQuemSomosCardComponent,
    GruposPesquisaParceirosCardComponent,
    GruposExtensaoEnsinoCardComponent,

  ],
  exports: [
    CoordinatorCardComponent,
    NewsCardComponent,
    EventsCardComponent,
    ResearchGroupCardComponent,
    GruposPesquisaPesquisasCardComponent,
    GruposPesquisaTesesCardComponent,
    GruposPesquisaArtigosCardComponent,
    GruposPesquisaLivrosCardComponent,
    GruposPesquisaCapitulosCardComponent,
    GruposPesquisaQuemSomosCardComponent,
    GruposPesquisaParceirosCardComponent,
    GruposExtensaoEnsinoCardComponent

  ]
})
export class CustomComponentsModule { }
