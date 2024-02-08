import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ComumService } from '@app/shared/services/comum.service';
import { GpiccService } from '@app/shared/services/gpicc.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.scss']
})
export class PostagensComponent implements OnInit {

  public form: FormGroup;
  news;

  constructor(
    private formBuilder: FormBuilder,
    private comumService: ComumService,

  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.listPosts();
  }

  cadastrar() {

    this.comumService.cadastrarNoticia(null, this.form).subscribe((res: any) => {
      this.listPosts()
    }, err => {
      console.log(err);
    });


  }

  private listPosts() {

    this.comumService.listPostagens()
      .subscribe((res: any) => {
        this.news = res;
      }, err => {
        console.log(err);
      });

  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, [Validators.required]],
      link: [null, []],
      ano: [null, []],
    });
  }

}
