import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HistoricoComponent } from './historico/historico.component';
import { LinhasPesquisaComponent } from './linhas-pesquisa/linhas-pesquisa.component';
import { EventosComponent } from './eventos/eventos.component';
import { ObrasPublicadasComponent } from './obras-publicadas/obras-publicadas.component';
import { GruposComponent } from './grupos/grupos.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { VisualizadorComponent } from './visualizador/visualizador.component';
import { MembrosComponent } from './membros/membros.component';
import { ProjetosInstitucionaisComponent } from './projetos-institucionais/projetos-institucionais.component';
import { ProjetosGruposComponent } from './projetos-grupos/projetos-grupos.component';
import { ProducoesComponent } from './producoes/producoes.component';
import { PostagensComponent } from './postagens/postagens.component';
import { AuthGuard } from './shared/guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'historico',
    component: HistoricoComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'linhas-pesquisa',
    component: LinhasPesquisaComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'eventos',
    component: EventosComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'membros',
    component: MembrosComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'projetos-institucionais',
    component: ProjetosInstitucionaisComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'postagens',
    component: PostagensComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projetos-individuais',
    component: ProjetosGruposComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'producoes',
    component: ProducoesComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'obras-publicadas',
    component: ObrasPublicadasComponent,
    /*canActivate: [AuthGuard],*/
  },
  {
    path: 'grupo/:grupo',
    component: GruposComponent,
    /*canActivate: [AuthGuard],*/
  },

  {
    path: 'visualizar',
    component: VisualizadorComponent,
    /*canActivate: [AuthGuard],*/
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
