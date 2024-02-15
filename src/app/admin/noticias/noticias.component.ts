import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewsComponent } from '@app/shared/dialogs/dialog-news/dialog-news.component';
import { ComumService } from '@app/shared/services/comum.service';
import { iif, map, Observable, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  public profileImage: any;
  public news: Array<any> = [];

  constructor(
    private comumService: ComumService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listAll()
      .subscribe();
  }

  private listAll(): Observable<any> {
    return this.comumService.listNoticia(null)
      .pipe(
        map((news: any) => this.news = news)
      )
  }

  public openDialog(form: any = null): Observable<any> {
    const dialog = this.dialog.open(DialogNewsComponent, {
      disableClose: true,
      minWidth: "40%",
      maxWidth: "100%",
      data: {
        form
      }
    });

    return dialog.afterClosed();
  }

  public register(): void {
    this.openDialog()
      .pipe(
        switchMap(({ save, form, file }: any) =>
          iif(() => save,
            this.comumService.cadastrarNoticia(file, form)
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
            this.comumService.atualizarNoticia(file, { ...form, _id: data._id })
              .pipe(switchMap(_ => this.listAll())),
            of(null)
          )
        )
      )
      .subscribe();
  }

  public delete(coordinator: any): void {
    this.comumService.deletarNoticia(coordinator._id)
      .pipe(
        take(1),
        switchMap(_ => this.listAll())
      )
      .subscribe()
  }

}
