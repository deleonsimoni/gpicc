import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: 'app-dialog-events',
  templateUrl: './dialog-events.component.html',
  styleUrls: ['./dialog-events.component.scss']
})
export class DialogEventsComponent {

  public form: FormGroup;
  public logo: any;
  imagePathS3: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogEventsComponent>,
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
      subTitle: [null, []],
      content: [null, []],
      externalLink: [null, []],
      period: [null, []],
      youtube: [null, []],
      instagram: [null, []],
      twitter: [null, []],
      facebook: [null, []]
    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);

    this.form.patchValue({
      title: data.title,
      subTitle: data.subTitle,
      content: data.content,
      externalLink: data.externalLink,
      period: data.period,
      youtube: data.youtube,
      instagram: data.instagram,
      twitter: data.twitter,
      facebook: data.facebook,
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
