import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obras-publicadas',
  templateUrl: './obras-publicadas.component.html',
  styleUrls: ['./obras-publicadas.component.scss']
})
export class ObrasPublicadasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = "../../assets/js/swiper.js";
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit() {
    this.loadScript();
  }



}
