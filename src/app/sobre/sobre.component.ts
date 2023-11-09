import { Component, OnInit } from '@angular/core';
import { ComumService } from '@app/shared/services/comum.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  carregando = false;
  quemSomos;

  constructor(
    private comumService: ComumService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.list();
    this.translate.onLangChange.subscribe((event) => {
      this.list();
    });
  }

  list() {
    this.comumService.listQuemSomos().subscribe((res: any) => {
      this.carregando = false;
      this.quemSomos = res[0];
    }, err => {
      this.carregando = false;
    });
  }

}
