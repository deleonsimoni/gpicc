import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CominduService } from '@app/comindu.service';
import { DialogNewsComponent } from '@app/shared/dialogs/dialog-news/dialog-news.component';
import { AuthService } from '@app/shared/services';
import { LepedService } from '@app/shared/services/leped.service';
import { iif, map, Observable, of, switchMap, take } from 'rxjs';
import { RegisterCominduComponent } from '../dialog/register-comindu/register-comindu.component';

@Component({
  selector: 'app-home-comindu',
  templateUrl: './home-comindu.component.html',
  styleUrls: ['./home-comindu.component.scss']
})
export class HomeCominduComponent implements OnInit {

  comunidades;
  carregando;
  tags;
  user;

  constructor(
    private cominduService: CominduService,
    public dialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listarTags();
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.listAll().subscribe();
      } else {
        this.listAllFree().subscribe();
      }
    });
  }

  public openDialog(form: any = null): Observable<any> {
    const dialog = this.dialog.open(RegisterCominduComponent, {
      disableClose: true,
      minWidth: "40%",
      maxWidth: "100%",
      data: {
        form
      }
    });

    return dialog.afterClosed();
  }

  private listAll(): Observable<any> {
    return this.cominduService.listComunidades()
      .pipe(
        map((comunidades: any) => this.comunidades = comunidades)
      )
  }

  private listAllFree(): Observable<any> {
    return this.cominduService.listComunidadesFree()
      .pipe(
        map((comunidades: any) => this.comunidades = comunidades)
      )
  }

  public listarTags() {
    this.carregando = true;
    this.cominduService.listTags()
      .subscribe((res: any) => {
        this.carregando = false;
        this.tags = res;
      }, err => {
        this.carregando = false;
      });
  }

  public register(): void {
    this.openDialog()
      .pipe(
        switchMap(({ save, form, file }: any) =>
          iif(() => save,
            this.cominduService.cadastrarComunidade(file, form)
              .pipe(switchMap(_ => this.listAll())),
            of(null)
          )
        )
      )
      .subscribe();
  }

  public edit(data: any): void {
    this.openDialog(data)
      .pipe(
        switchMap(({ save, form, file }: any) =>
          iif(() => save,
            this.cominduService.alterarComunidade(file, { ...form, _id: data._id })
              .pipe(switchMap(_ => this.listAll())),
            of(null)
          )
        )
      )
      .subscribe();
  }

}
