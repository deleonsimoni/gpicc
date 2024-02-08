import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePathComplement } from '@app/shared/pipes/image-path-complement.pipe';
import { GpiccService } from '@app/shared/services/gpicc.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projetos-grupos',
  templateUrl: './projetos-grupos.component.html',
  styleUrls: ['./projetos-grupos.component.scss']
})
export class ProjetosGruposComponent implements OnInit {

  publicacao = 'dissertacao';
  pesquisas = 'Pesquisas Realizadas';
  home;
  pesquisasServer;
  livros;
  teses;
  artigos;
  capitulos;
  extensaoEnsino;

  constructor(
    private gpiccService: GpiccService,
    private _sanitizer: DomSanitizer,
    private translate: TranslateService,
    private pipeImage: ImagePathComplement

  ) { }

  ngOnInit(): void {
    this.getPesquisas('gpicc', 1);
  }

  sanitizeVideo(link) {
    if (link && link.includes('watch')) {
      link = link.replace('watch?v=', 'embed/');
    }

    return this._sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  baixar(url) {
    return url = this.pipeImage.transform(url);
  }

  public getPesquisas(type, typePesquisa) {

    this.gpiccService.listPesquisa(type, typePesquisa)
      .subscribe((res: any) => {
        if (res.length > 1) {
          this.pesquisasServer = { pesquisas: res };
        } else {
          this.pesquisasServer = res[0];
        }

        if (typePesquisa) {
          if (typePesquisa == 1) {
            this.pesquisasServer.pesquisas = this.pesquisasServer.pesquisas.filter(p => p.icPesquisa == 'Realizada')
          } else {
            this.pesquisasServer.pesquisas = this.pesquisasServer.pesquisas.filter(p => p.icPesquisa == 'Em Andamento')
          }
        }

      }, err => {
        console.log(err);
      });

  }

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = "../../assets/js/gallery.js";
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit() {
    this.loadScript();
  }

}
