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
      linkTesis: [null, []]

    });
  }

  private fillForm(data: any): void {


    this.grupoForm.patchValue({

      titleTesis: data.titleTesis,
      categoryId: data.categoryId,
      resume: data.resume,
      authorTesis: data.authorTesis,
      dateTesis: data.dateTesis,
      linkTesis: data.linkTesis

    })
  }



  public registerTesis(): void {
    if (this.grupoForm.valid) {
      const files = [];
      this.dialogRef.close({ save: true, form: this.grupoForm.value, files })
    }
  }

  public closeDialog(): void {

    this.dialogRef.close({ save: false });
  }



}
