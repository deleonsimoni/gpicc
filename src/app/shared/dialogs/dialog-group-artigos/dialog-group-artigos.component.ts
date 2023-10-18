import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: "dialog-group-artigos-component",
  templateUrl: "./dialog-group-artigos.component.html",
  styleUrls: ["./dialog-group-artigos.component.scss"]
})
export class DialogGroupArtigosComponent {

  public grupoForm: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogGroupArtigosComponent>,
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
      titleArticle: [null, [Validators.required]],
      authorsArticle: [null, [Validators.required]],
      journalArticle: [null, [Validators.required]],
      linkArticle: [null, [Validators.required]],
      ordem: []

    });
  }

  private fillForm(data: any): void {


    this.grupoForm.patchValue({

      titleArticle: data.titleArticle,
      authorsArticle: data.authorsArticle,
      journalArticle: data.journalArticle,
      linkArticle: data.linkArticle,
      ordem: data.ordem

    })
  }



  public registerArticle(): void {
    if (this.grupoForm.valid) {
      const files = [];
      this.dialogRef.close({ save: true, form: this.grupoForm.value, files })
    }
  }

  public closeDialog(): void {

    this.dialogRef.close({ save: false });
  }



}
