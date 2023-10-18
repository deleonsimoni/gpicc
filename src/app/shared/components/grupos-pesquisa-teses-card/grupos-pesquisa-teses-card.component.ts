import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";


@Component({
  selector: 'app-grupos-pesquisa-teses-card',
  templateUrl: './grupos-pesquisa-teses-card.component.html',
  styleUrls: ['./grupos-pesquisa-teses-card.component.scss']
})
export class GruposPesquisaTesesCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();


}
