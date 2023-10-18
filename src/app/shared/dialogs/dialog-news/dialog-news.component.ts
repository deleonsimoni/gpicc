import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: 'app-dialog-news',
  templateUrl: './dialog-news.component.html',
  styleUrls: ['./dialog-news.component.scss']
})
export class DialogNewsComponent {

  public form: FormGroup;
  public logo: any;
  imagePathS3: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any },
    private pipeImage: ImagePathComplement
  ) {
    this.form = this.createForm();

    if (this.data.form != null) {
      this.fillForm(this.data.form);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: [null, [Validators.required]],
      ordem: [null, []],
      content: [null, [Validators.required]],
      externalLink: [null, []],
      isCarrossel: []
    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);

    this.form.patchValue({
      title: data.title,
      content: data.content,
      ordem: data.ordem,
      externalLink: data.externalLink,
      isCarrossel: data.isCarrossel
    })
  }

  public getProfileImageCode(event: any): void {
    const that = this;
    const FR = new FileReader();
    const files = event.target.files;

    FR.addEventListener("load", function (e) {
      that.logo = e.target.result;
    });

    if (files && files[0]) {
      that.imagePathS3 = files[0];
      FR.readAsDataURL(files[0]);
    } else {
      that.logo = null;
      that.imagePathS3 = null;
    }
  }

  public register(): void {
    if (this.form.valid) {
      this.dialogRef.close({ save: true, form: this.form.value, file: this.imagePathS3 })
    }
  }

  public closeDialog(): void {
    this.dialogRef.close({ save: false });
  }
}
