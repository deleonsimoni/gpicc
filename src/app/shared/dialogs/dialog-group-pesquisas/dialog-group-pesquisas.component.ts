import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: 'dialog-group-pesquisas',
  templateUrl: './dialog-group-pesquisas.component.html',
  styleUrls: ['./dialog-group-pesquisas.component.scss']
})
export class DialogGroupPesquisasComponent {

  public form: FormGroup;
  file: File | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogGroupPesquisasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any },
    private pipeImage: ImagePathComplement
  ) {
    this.form = this.createForm();

    if (this.data.form != null) {
      this.fillForm(this.data.form);
    }

  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      titleResearch: [null, [Validators.required]],
      coordination: [null, [Validators.required]],
      period: [null, [Validators.required]],
      resume: [null, [Validators.required]],
      financing: [null, []],
      icPesquisa: [null, [Validators.required]],
      icTipoPesquisa: [null, [Validators.required]],
      /*  publicationResearch: [null, [Validators.required]],*/
      researchLink: [null, []]
    });
  }

  private fillForm(data: any): void {


    this.form.patchValue({

      titleResearch: data.titleResearch,
      coordination: data.coordination,
      period: data.period,
      resume: data.resume,
      financing: data.financing,
      icPesquisa: data.icPesquisa,
      icTipoPesquisa: data.icTipoPesquisa,
      /*publicationResearch: data.publicationResearch,*/
      researchLink: data.researchLink

    })
  }



  public register(): void {
    if (this.form.valid) {

      this.dialogRef.close({ save: true, form: this.form.value, file: this.file })
    }
  }

  public closeDialog(): void {

    this.dialogRef.close({ save: false });
  }



}
