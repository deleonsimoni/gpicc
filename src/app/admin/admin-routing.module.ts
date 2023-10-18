import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { GruposPesquisaComponent } from './grupos-pesquisa/grupos-pesquisa.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { CoordenadorasComponent } from './coordenadoras/coordenadoras.component';
import { NoticiasComponent } from '@app/admin/noticias/noticias.component';
import { EventosComponent } from '@app/admin/eventos/eventos.component';
import { PesquisasComponent } from './grupos-pesquisa/pesquisas/pesquisas.component';
import { TesesComponent } from './grupos-pesquisa/teses/teses.component';
import { ArtigosComponent } from './grupos-pesquisa/artigos/artigos.component';
import { LivrosComponent } from './grupos-pesquisa/livros/livros.component';
import { CapitulosComponent } from './grupos-pesquisa/capitulos/capitulos.component';
import { QuemSomosGrupoComponent } from './grupos-pesquisa/quem-somos-grupo/quem-somos-grupo.component';
import { ParceirosComponent } from './grupos-pesquisa/parceiros/parceiros.component';
import { ExtensaoEnsinoComponent } from './grupos-pesquisa/extensao-ensino/extensao-ensino.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [OnlyAdminUsersGuard],
    component: AdminComponent,
    children: [

      {
        path: 'quem-somos', component: QuemSomosComponent
      },
      {
        path: 'coordenadoras', component: CoordenadorasComponent
      },
      {
        path: 'eventos', component: EventosComponent
      },
      {
        path: 'galeria', component: GaleriaComponent
      },
      {
        path: 'grupos-pesquisa', component: GruposPesquisaComponent
      },
      {
        path: 'noticias', component: NoticiasComponent
      },
      {
        path: 'grupos-pesquisa/pesquisas', component: PesquisasComponent
      },
      {
        path: 'grupos-pesquisa/teses', component: TesesComponent
      },
      {
        path: 'grupos-pesquisa/artigos', component: ArtigosComponent
      },
      {
        path: 'grupos-pesquisa/livros', component: LivrosComponent
      },
      {
        path: 'grupos-pesquisa/capitulos', component: CapitulosComponent
      },
      {
        path: 'grupos-pesquisa/participantes-grupo', component: QuemSomosGrupoComponent
      },
      {
        path: 'grupos-pesquisa/parceiros', component: ParceirosComponent
      },
      {
        path: 'grupos-pesquisa/extensao-ensino', component: ExtensaoEnsinoComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
