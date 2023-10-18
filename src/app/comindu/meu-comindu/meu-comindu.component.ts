import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CominduService } from '@app/comindu.service';
import { AuthService } from '@app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-meu-comindu',
  templateUrl: './meu-comindu.component.html',
  styleUrls: ['./meu-comindu.component.scss']
})
export class MeuCominduComponent implements OnInit {

  comunidades;
  carregando;
  bio;
  user;
  tags = [];
  image: FileList;
  edit = false;
  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;


  constructor(
    private cominduService: CominduService,
    public dialog: MatDialog,
    public authService: AuthService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.listMyComunidades();
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }


  public updateProfile() {

    this.authService.updateBio(this.image == null ? null : this.image[0], this.bio)
      .subscribe((res: any) => {
        this.toastr.success('Bio alterada com sucesso', 'Sucesso');
      }, (err: any) => {
        this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
        console.log(err);
      });

  }


  private listMyComunidades() {
    this.carregando = true;
    this.cominduService.listMyComunidades()
      .subscribe((res: any) => {
        this.carregando = false;
        this.comunidades = res;
        this.bio = res.bio;
        if (this.comunidades.comunidades.length > 0) {
          this.comunidades.comunidades.forEach(element => {
            if (element.idComunidade) {
              element.idComunidade.tags.forEach(tag => {
                this.tags.push(tag);
              })
            }
          });
        }
      }, err => {
        this.carregando = false;
      });
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