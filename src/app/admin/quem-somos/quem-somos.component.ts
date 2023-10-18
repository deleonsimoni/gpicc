import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LepedService } from '@app/shared/services/leped.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.scss']
})
export class QuemSomosComponent implements OnInit {

  public form: FormGroup;
  logo;
  carregando = false;
  data: any;
  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;
  private image: FileList;

  constructor(
    private builder: FormBuilder,
    private lepedService: LepedService,
    private toastr: ToastrService,
  ) {
    this.form = this.builder.group({
      _id: [],
      title: [null, [Validators.required]],
      subTitle: [null, [Validators.required]],
      content: [null, [Validators.required]],
      logo: [null, []],
      facebook: [null, []],
      youtube: [null, []],
      instagram: [null, []],
      twitter: [null, []]
    });
  }

  ngOnInit(): void {
    this.lepedService.listQuemSomos().subscribe((res: any) => {
      this.carregando = false;
      this.data = res;
      this.logo = res[0].logo;
      this.form.patchValue(res[0]);
    }, err => {
      this.carregando = false;
      this.toastr.error('Ocorreu um erro ao listar Quem Somos', 'Atenção: ');
    });;
  }

  public register() {

    if (this.form.valid) {

      if (this.form.value._id) {

        this.lepedService.atualizarQuemSomos(this.image == null ? null : this.image[0], this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Quem Somos alterado com sucesso', 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
            console.log(err);
          });

      } else {
        this.lepedService.cadastrarQuemSomos(this.image[0], this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Quem Somos cadastrado', 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
            console.log(err);
          });
      }

    }
  }

  public loadImage() {
    let element: HTMLElement = document.getElementById('imageConferencer') as HTMLElement;
    element.click();
  }

  public setImage(files: FileList): void {
    this.image = files;

    const reader = new FileReader();
    reader.readAsDataURL(this.image[0]); // Read file as data url
    reader.onloadend = (e) => { // function call once readAsDataUrl is completed
      this.imageRender.nativeElement.src = e.target['result']; // Set image in element
    };
  }

}
