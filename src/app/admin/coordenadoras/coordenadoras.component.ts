import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterCoordinatorComponent } from '@app/shared/dialogs/dialog-register-coordinator/dialog-register-coordinator.component';
import { CoordenadorasService } from '@app/shared/services/coordenadoras/coordenadoras.service';
import { Coordenadora } from '@app/shared/types';
import { iif, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-coordenadoras',
  templateUrl: './coordenadoras.component.html',
  styleUrls: ['./coordenadoras.component.scss']
})
export class CoordenadorasComponent implements OnInit {

  public profileImage: any;
  public coordenadores: Array<any> = [];

  constructor(
    private coordenadoraService: CoordenadorasService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listAll()
      .subscribe();
  }

  private listAll(): Observable<any> {
    return this.coordenadoraService.listAll()
      .pipe(
        map(coordenadores => this.coordenadores = coordenadores)
      )
  }

  public openDialog(coordenador: any = null): Observable<any> {
    const dialog = this.dialog.open(DialogRegisterCoordinatorComponent, {
      disableClose: true,
      minWidth: "40%",
      maxWidth: "100%",
      data: {
        coordenador
      }
    });

    return dialog.afterClosed();
  }

  public register(): void {
    this.openDialog()
      .pipe(
        switchMap(({ save, coordenador, file }: any) =>
          iif(() => save,
            this.coordenadoraService.save(file, coordenador)
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
        switchMap(({ save, coordenador, file }: any) =>
          iif(() => save,
            this.coordenadoraService.update(file, { ...coordenador, _id: data._id })
              .pipe(switchMap(_ => this.listAll())),
            of(null)
          )
        )
      )
      .subscribe();
  }

  public delete(coordinator: any): void {
    this.coordenadoraService.delete(coordinator._id)
      .pipe(
        take(1),
        switchMap(_ => this.listAll())
      )
      .subscribe()
  }

}
