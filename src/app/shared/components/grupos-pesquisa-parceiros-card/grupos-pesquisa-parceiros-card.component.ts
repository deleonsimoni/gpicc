import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-grupos-pesquisa-parceiros-card',
  templateUrl: './grupos-pesquisa-parceiros-card.component.html',
  styleUrls: ['./grupos-pesquisa-parceiros-card.component.scss']
})
export class GruposPesquisaParceirosCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();

}
