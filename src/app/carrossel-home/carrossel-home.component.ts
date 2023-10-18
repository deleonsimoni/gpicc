import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LepedService } from '@app/shared/services/leped.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrossel-home',
  templateUrl: './carrossel-home.component.html',
  styleUrls: ['./carrossel-home.component.scss']
})
export class CarrosselHomeComponent implements OnInit {

  mobile: any;
  noticias = [];

  constructor(
    config: NgbCarouselConfig,
    private router: Router,
    private lepedService: LepedService,
  ) {
    config.interval = 8000;
    config.keyboard = true;
    config.pauseOnHover = true;

  }

  ngOnInit(): void {
    if (window.screen.width <= 400) { // 768px portrait
      this.mobile = true;
    }

    this.lepedService.listNoticiaCarrossel()
      .subscribe((res: any) => {
        this.noticias = res;
      }, err => {
        console.log(err);
      });

  }

  visualizar(item) {
    item.tipo = 'noticia';
    this.router.navigate(['visualizar'], { state: { data: item } });
  }

}
