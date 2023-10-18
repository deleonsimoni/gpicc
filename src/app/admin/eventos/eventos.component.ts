import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEventsComponent } from '@app/shared/dialogs/dialog-events/dialog-events.component';
import { DialogNewsComponent } from '@app/shared/dialogs/dialog-news/dialog-news.component';
import { LepedService } from '@app/shared/services/leped.service';
import { iif, map, Observable, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {


  public profileImage: any;
  public events: Array<any> = [];

  constructor(
    private lepedService: LepedService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listAll()
      .subscribe();
  }

  private listAll(): Observable<any> {
    return this.lepedService.listEvento()
      .pipe(
        map((events: any) => this.events = events)
      )
  }

  public openDialog(form: any = null): Observable<any> {
    const dialog = this.dialog.open(DialogEventsComponent, {
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
            this.lepedService.cadastrarEvento(file, form)
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
            this.lepedService.atualizarEvento(file, { ...form, _id: data._id })
              .pipe(switchMap(_ => this.listAll())),
            of(null)
          )
        )
      )
      .subscribe();
  }

  public delete(coordinator: any): void {
    this.lepedService.deletarEvento(coordinator._id)
      .pipe(
        take(1),
        switchMap(_ => this.listAll())
      )
      .subscribe()
  }

}
