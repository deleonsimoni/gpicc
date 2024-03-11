import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '@app/shared/interfaces';
import { ImagePathComplement } from '@app/shared/pipes/image-path-complement.pipe';
import { AuthService } from '@app/shared/services';
import { ComumService } from '@app/shared/services/comum.service';
import { GpiccService } from '@app/shared/services/gpicc.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.scss']
})
export class PostagensComponent implements OnInit {

  @Input() user: User | null = null;

  titleSearch;
  public form: FormGroup;
  news;
  file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private comumService: ComumService,
    private pipeImage: ImagePathComplement,
    private toastr: ToastrService,
    private authService: AuthService,

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
    this.authService.getUser().subscribe(user => this.user = user);
    this.listPosts();
  }

  cadastrar() {

    this.comumService.cadastrarNoticia(this.file, this.form).subscribe((res: any) => {
      this.form.reset();
      this.file = null;
      this.toastr.success('Publicação realizada com sucesso', 'Sucesso');
      this.listPosts();
    }, err => {
      console.log(err);
    });


  }

  private listPosts() {

    this.comumService.listPostagens(null)
      .subscribe((res: any) => {
        this.news = res;
      }, err => {
        console.log(err);
      });

  }

  search() {

    if (!this.titleSearch) {
      this.toastr.warning('Preencha o campo de pesquisa.', 'Atenção');
    } else {

      this.comumService.listPostagens(this.titleSearch)
        .subscribe((res: any) => {
          this.news = res;
        }, err => {
          console.log(err);
        });

    }



  }

  excluirPostagem(id) {

    this.comumService.excluirPostagem(id)
      .subscribe((res: any) => {
        this.toastr.success('Publicação excluida com sucesso', 'Sucesso');
        this.listPosts();
      }, err => {
        console.log(err);
      });

  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, [Validators.required]],
      link: [null, []],
      ano: [null, []],
      autor: [null, []],
    });
  }

}
