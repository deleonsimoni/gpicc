import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LepedService } from '@app/shared/services/leped.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  coordenadoras;
  galerias;
  carregando = false;

  constructor(
    private lepedService: LepedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregando = true;

    this.lepedService.montarHomeLeped()
      .subscribe((res: any) => {
        this.carregando = false;
        this.coordenadoras = res.coordenadoras;
        this.galerias = res.galeria;
      }, err => {
        this.carregando = false;
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
