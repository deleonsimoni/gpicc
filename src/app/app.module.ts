import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './shared/services';
import { CarrosselHomeComponent } from './carrossel-home/carrossel-home.component';
import { EventosComponent } from './eventos/eventos.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { HistoricoComponent } from './historico/historico.component';
import { LinhasPesquisaComponent } from './linhas-pesquisa/linhas-pesquisa.component';
import { APP_BASE_HREF } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SobreComponent } from './sobre/sobre.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ObrasPublicadasComponent } from './obras-publicadas/obras-publicadas.component';
import { GruposComponent } from './grupos/grupos.component';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { GepedComponent } from './geped/geped.component';
import { GepematComponent } from './gepemat/gepemat.component';
import { GeprodComponent } from './geprod/geprod.component';
import { GedocComponent } from './gedoc/gedoc.component';
import { GecultComponent } from './gecult/gecult.component';

import { ToastrModule } from 'ngx-toastr';
import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { ModalTermoComponent } from './dialog/modal-termo/modal-termo.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CustomPipesModule } from './shared/pipes/custom-pipes.module';
import { VisualizadorComponent } from './visualizador/visualizador.component';
import { HomeCominduComponent } from './comindu/home-comindu/home-comindu.component';
import { NgxPopperModule } from 'ngx-popper';

import { MatCardModule } from '@angular/material/card';
import { RegisterCominduComponent } from './comindu/dialog/register-comindu/register-comindu.component';
import { ComunidadeCominduComponent } from './comindu/comunidade-comindu/comunidade-comindu.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { ColorPickerModule } from 'ngx-color-picker';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { MeuCominduComponent } from './comindu/meu-comindu/meu-comindu.component';
import { InscritosComponent } from './comindu/admin/inscritos/inscritos.component';
import { InscritosCardComponent } from './comindu/admin/inscritos-card/inscritos-card.component';
import { InscritosDataComponent } from './comindu/admin/inscritos-data/inscritos-data.component';
import { ChatCominduComponent } from './comindu/chat-comindu/chat-comindu.component';

registerLocaleData(localePT);

export function appInitializerFactory(authService: AuthService) {
  return () => authService.checkTheUserOnTheFirstLoad();
}



@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
    NgxFlagPickerModule,
    AngularEditorModule,
    CustomPipesModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    ColorPickerModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    NgxPopperModule.forRoot(),


  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarrosselHomeComponent,
    EventosComponent,
    NoticiasComponent,
    HistoricoComponent,
    LinhasPesquisaComponent,
    FooterComponent,
    SobreComponent,
    ObrasPublicadasComponent,
    GruposComponent,
    GepedComponent,
    GepematComponent,
    GeprodComponent,
    GedocComponent,
    GecultComponent,
    DialogDeleteComponent,
    ModalTermoComponent,
    VisualizadorComponent,
    HomeCominduComponent,
    RegisterCominduComponent,
    ComunidadeCominduComponent,
    MeuCominduComponent,
    InscritosComponent,
    InscritosCardComponent,
    InscritosDataComponent,
    ChatCominduComponent,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },

    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}