import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: "dialog-group-teses-component",
  templateUrl: "./dialog-group-teses.component.html",
  styleUrls: ["./dialog-group-teses.component.scss"]
})
export class DialogGroupTesesComponent {
  grupo = '';
  public grupoForm: FormGroup;
  file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogGroupTesesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any },

  ) {
    this.grupoForm = this.createForm();

    if (this.data.form != null) {
      this.fillForm(this.data.form);
    }

  }


  private createForm(): FormGroup {
    return this.formBuilder.group({
      titleTesis: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      authorTesis: [null, [Validators.required]],
      dateTesis: [null, [Validators.required]],
      link: [null, []],
      periodic: [null, []],
      financing: [null, []]


    });
  }

  private fillForm(data: any): void {


    this.grupoForm.patchValue({

      titleTesis: data.titleTesis,
      categoryId: data.categoryId,
      resume: data.resume,
      authorTesis: data.authorTesis,
      dateTesis: data.dateTesis,
      link: data.link,
      periodic: data.periodic,
      financing: data.financing
    })
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }


  public registerTesis(): void {
    if (this.grupoForm.valid) {
      const files = [];
      this.dialogRef.close({ save: true, form: this.grupoForm.value, file: this.file })
    }
  }

  public closeDialog(): void {

    this.dialogRef.close({ save: false });
  }



}
