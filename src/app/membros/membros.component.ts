import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GpiccService } from '@app/shared/services/gpicc.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.component.html',
  styleUrls: ['./membros.component.scss']
})
export class MembrosComponent implements OnInit {

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
    this.listAll();
    this.translate.onLangChange.subscribe((event) => {
      this.listAll();
    });
  }

  public listAll() {

    this.gpiccService.listHome('gpicc')
      .subscribe((res: any) => {
        this.home = res[0];
        this.ordenarParticipantes();
        this.ordenarParceiros();
      }, err => {
        console.log(err);
      });

  }

  ordenarParticipantes() {

    this.home.participantes.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })

  }

  ordenarParceiros() {

    this.home.parceiros.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })

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
