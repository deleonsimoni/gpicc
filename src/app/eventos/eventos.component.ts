import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComumService } from '@app/shared/services/comum.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  eventos;
  carregando = false;

  constructor(
    private comumService: ComumService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.carregando = true;
    this.list();
    this.translate.onLangChange.subscribe((event) => {
      this.list();
    });
  }

  list() {
    this.comumService.listEvento()
      .subscribe((res: any) => {
        this.carregando = false;
        this.eventos = res;
      }, err => {
        this.carregando = false;
        console.log(err);
      });
  }

  visualizar(item) {
    item.tipo = 'evento';
    this.router.navigate(['visualizar'], { state: { data: item } });
  }

}
