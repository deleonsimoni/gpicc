import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GpiccService } from '@app/shared/services/gpicc.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projetos-institucionais',
  templateUrl: './projetos-institucionais.component.html',
  styleUrls: ['./projetos-institucionais.component.scss']
})
export class ProjetosInstitucionaisComponent implements OnInit {

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
    private translate: TranslateService

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

  orderArray(array) {
    array.extensaoEnsino.sort(function (a, b) {
      return b.end - a.end
    });
  }

  public getPesquisas(type, typePesquisa) {

    this.gpiccService.listExtensaoEnsino(type, typePesquisa)
      .subscribe((res: any) => {
        this.pesquisasServer = res[0];
        this.orderArray(this.pesquisasServer);
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
