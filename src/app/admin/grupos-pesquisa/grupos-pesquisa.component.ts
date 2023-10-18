import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogResearchGroupComponent } from '@app/shared/dialogs/dialog-research-group/dialog-research-group.component';
import { GrupoPesquisaService } from '@app/shared/services/grupo-pesquisa/grupo-pesquisa.service';
import { iif, map, Observable, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-grupos-pesquisa',
  templateUrl: './grupos-pesquisa.component.html',
  styleUrls: ['./grupos-pesquisa.component.scss']
})
export class GruposPesquisaComponent implements OnInit {

  public grupos: Array<any> = [];

  constructor(
    private grupoPesquisaService: GrupoPesquisaService,
    public dialog: MatDialog,
    public router: Router

  ) { }

  ngOnInit(): void {
    this.listAll()
      .subscribe();
  }

  public openDialog(grupo: any = null): Observable<any> {
    const dialog = this.dialog.open(DialogResearchGroupComponent, {
      disableClose: true,
      minWidth: "40%",
      maxWidth: "100%",
      data: {
        grupo
      }
    });

    return dialog.afterClosed()
      .pipe(take(1));
  }

  private listAll(): Observable<any> {
    return this.grupoPesquisaService.listAll()
      .pipe(
        take(1),
        map(grupos => this.grupos = grupos)
      );
  }

  public register(): void {
    this.openDialog()
      .pipe(
        switchMap(({ save, grupo, files }: any) =>
          iif(() => save,
            this.grupoPesquisaService.save(files, grupo)
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
        switchMap(({ save, grupo, files }: any) =>
          iif(() => save,
            this.grupoPesquisaService.update(files, { ...grupo, _id: data._id })
              .pipe(switchMap(_ => this.listAll())),
            of(null)
          )
        )
      )
      .subscribe();
  }

  public delete(grupo: any): void {
    this.grupoPesquisaService.delete(grupo._id)
      .pipe(
        take(1),
        switchMap(_ => this.listAll())
      )
      .subscribe()
  }

  public participante(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/participantes-grupo'], { queryParams: { type: data.type } })

  }

  public pesquisa(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/pesquisas'], { queryParams: { type: data.type } })

  }

  public dissertacao(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/teses'], { queryParams: { type: data.type } })

  }

  public artigo(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/artigos'], { queryParams: { type: data.type } })

  }

  public livro(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/livros'], { queryParams: { type: data.type } })

  }

  public capitulo(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/capitulos'], { queryParams: { type: data.type } })

  }

  public parceiros(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/parceiros'], { queryParams: { type: data.type } })

  }

  public extensaoEnsino(data: any): void {
    this.router.navigate(['/admin/grupos-pesquisa/extensao-ensino'], { queryParams: { type: data.type } })

  }

}
