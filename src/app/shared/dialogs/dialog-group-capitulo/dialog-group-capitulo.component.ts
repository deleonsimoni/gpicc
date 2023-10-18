import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: "dialog-group-capitulo-component",
  templateUrl: "./dialog-group-capitulo.component.html",
  styleUrls: ["./dialog-group-capitulo.component.scss"]
})
export class DialogGroupCapituloComponent {

  public grupoForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogGroupCapituloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any },
    private pipeImage: ImagePathComplement
  ) {
    this.grupoForm = this.createForm();

    if (this.data.form != null) {
      this.fillForm(this.data.form);
    }

  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      /*  type: [null, [Validators.required]],*/
      titleChapter: [null, [Validators.required]],
      authorsChapter: [null, [Validators.required]],
      titleBook: [null, [Validators.required]],
      eds: [null, [Validators.required]],
      publisher: [null, [Validators.required]],
      edition: [null, [Validators.required]],
      location: [null, [Validators.required]],
      vol: [null, [Validators.required]],
      pages: [null, [Validators.required]],
      year: [null, [Validators.required]],
      ordem: []

    });
  }

  private fillForm(data: any): void {


    this.grupoForm.patchValue({
      /* type: data.type,*/
      titleChapter: data.titleChapter,
      authorsChapter: data.authorsChapter,
      titleBook: data.titleBook,
      eds: data.eds,
      publisher: data.publisher,
      edition: data.edition,
      location: data.location,
      vol: data.vol,
      pages: data.pages,
      year: data.year,
      ordem: data.ordem

    })
  }



  public registerChapter(): void {
    if (this.grupoForm.valid) {
      const files = [];
      this.dialogRef.close({ save: true, form: this.grupoForm.value, files })
    }
  }

  public closeDialog(): void {

    this.dialogRef.close({ save: false });
  }



}
