import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePathComplement } from '@app/shared/pipes/image-path-complement.pipe';
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
  file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private comumService: ComumService,
    private pipeImage: ImagePathComplement

  ) {
    this.form = this.createForm();
  }

  baixar(url) {
    return url = this.pipeImage.transform(url);
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  ngOnInit(): void {
    this.listPosts();
  }

  cadastrar() {

    this.comumService.cadastrarNoticia(this.file, this.form).subscribe((res: any) => {
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
