import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";
import { ActivatedRoute } from '@angular/router';
import { type } from "os";

@Component({
  selector: 'app-dialog-extensao-ensino-group',
  templateUrl: './dialog-extensao-ensino-group.component.html',
  styleUrls: ['./dialog-extensao-ensino-group.component.scss']
})
export class DialogExtensaoEnsinoGroupComponent {

  public grupoForm: FormGroup;
  type;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogExtensaoEnsinoGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any, type: any },
    private pipeImage: ImagePathComplement
  ) {
    this.grupoForm = this.createForm();

    if (this.data.form != null) {
      this.fillForm(this.data.form);
    }
    this.type = this.data.type;

  }


  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, [Validators.required]],
      begin: [null, []],
      end: [null, []],
      resume: [null, []],
      financing: [null, []],
      researchLink: [null, []]
    });

  }



  private fillForm(data: any): void {
    this.grupoForm.patchValue({
      title: data.title,
      begin: data.begin,
      end: data.end,
      resume: data.resume,
      financing: data.financing,
      researchLink: data.researchLink
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
