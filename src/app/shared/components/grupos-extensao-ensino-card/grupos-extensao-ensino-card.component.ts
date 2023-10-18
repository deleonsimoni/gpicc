import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-grupos-extensao-ensino-card',
  templateUrl: './grupos-extensao-ensino-card.component.html',
  styleUrls: ['./grupos-extensao-ensino-card.component.scss']
})
export class GruposExtensaoEnsinoCardComponent {

  @Input() forms: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<boolean> = new EventEmitter();

}
