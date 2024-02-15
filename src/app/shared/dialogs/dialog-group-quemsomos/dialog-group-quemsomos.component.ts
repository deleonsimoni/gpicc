import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: "dialog-group-quemsomos-component",
  templateUrl: "./dialog-group-quemsomos.component.html",
  styleUrls: ["./dialog-group-quemsomos.component.scss"]
})
export class DialogGroupQuemsomosComponent {

  public participantesForm: FormGroup;
  public logo: any;
  imagePathS3: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogGroupQuemsomosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any },
    private pipeImage: ImagePathComplement
  ) {
    this.participantesForm = this.createForm();

    if (this.data.form != null) {
      this.fillForm(this.data.form);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, []],
      orcid: [null, []],
      lattes: [null, []],
      instagram: [null, []],
      twitter: [null, []],
      facebook: [null, []],
      minicurriculo: [null, []],
      imagePathS3: [null, []],
      isEgresso: [null, []]
    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);

    this.participantesForm.patchValue({
      name: data.name,
      group: data.group,
      email: data.email,
      orcid: data.orcid,
      lattes: data.lattes,
      instagram: data.instagram,
      twitter: data.twitter,
      facebook: data.facebook,
      minicurriculo: data.minicurriculo,
      imagePathS3: data.imagePathS3,
      isEgresso: data.isEgresso
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

  public registerParticipante(): void {
    if (this.participantesForm.valid) {
      this.dialogRef.close({ save: true, participante: this.participantesForm.value, file: this.imagePathS3 })
    }
  }

  public closeDialog(): void {
    this.dialogRef.close({ save: false });
  }
}
