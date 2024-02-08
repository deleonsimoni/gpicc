import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: 'app-dialog-group-parceiros',
  templateUrl: './dialog-group-parceiros.component.html',
  styleUrls: ['./dialog-group-parceiros.component.scss']
})
export class DialogGroupParceirosComponent {

  public grupoForm: FormGroup;
  public logo: any;
  public logo2: any;
  public imagePathS3: File = null;

  public imageBook: any[] = [
    { base64: null }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogGroupParceirosComponent>,
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
      title: [null, [Validators.required]],
      parceriaemail: [null, []],
      parceriaorcid: [null, []],
      parcerialattes: [null, []],
      parceriainstagram: [null, []],
      parceriatwitter: [null, []],
      parceriafacebook: [null, []],
      parceriaminicurriculo: [null, []],
      imagePathS3: [null, []],
      date: [null, []],
      link: [null, []],
      details: [null, []],

    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);

    this.grupoForm.patchValue({
      parceriaName: data.parceriaName,
      parceriaemail: data.email,
      parceriaorcid: data.orcid,
      parcerialattes: data.lattes,
      parceriainstagram: data.instagram,
      parceriatwitter: data.twitter,
      parceriafacebook: data.facebook,
      parceriaminicurriculo: data.minicurriculo,
      imagePathS3: data.imagePathS3,
      title: data.title,
      date: data.date,
      link: data.link,
      details: data.details,

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

  public registerBook(): void {
    if (this.grupoForm.valid) {
      this.dialogRef.close({ save: true, form: this.grupoForm.value, file: this.imagePathS3 })
    }
  }

  public closeDialog(): void {
    this.dialogRef.close({ save: false });
  }

}
