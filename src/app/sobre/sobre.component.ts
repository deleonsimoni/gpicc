import { Component, OnInit } from '@angular/core';
import { LepedService } from '@app/shared/services/leped.service';
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
    private lepedService: LepedService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.list();
    this.translate.onLangChange.subscribe((event) => {
      this.list();
    });
  }

  list() {
    this.lepedService.listQuemSomos().subscribe((res: any) => {
      this.carregando = false;
      this.quemSomos = res[0];
    }, err => {
      this.carregando = false;
    });
  }

}
