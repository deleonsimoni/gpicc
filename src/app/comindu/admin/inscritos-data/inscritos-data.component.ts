import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { CominduService } from '@app/comindu.service';
import { ToastrService } from 'ngx-toastr';
import { ImagePathComplement } from '@app/shared/pipes/image-path-complement.pipe';


@Component({
  selector: 'app-inscritos-data',
  templateUrl: './inscritos-data.component.html',
  styleUrls: ['./inscritos-data.component.scss']
})
export class InscritosDataComponent implements OnInit {

  @Input() subscribed: any;

  public carregando = false;

  constructor(
    private cominduService: CominduService,
    private toastr: ToastrService,
    private http: HttpClient,
    private pipeImage: ImagePathComplement

  ) { }

  ngOnInit(): void {
  }

  baixarComprovante(url) {
    return url = this.pipeImage.transform(url);
  }

}
