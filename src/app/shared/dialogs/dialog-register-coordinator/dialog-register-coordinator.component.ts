import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";
import { Coordenadora } from "@app/shared/types";

@Component({
  selector: "dialog-register-coordinator-component",
  templateUrl: "./dialog-register-coordinator.component.html",
  styleUrls: ["./dialog-register-coordinator.component.scss"]
})
export class DialogRegisterCoordinatorComponent {

  public coordenadoraForm: FormGroup;
  public logo: any;
  imagePathS3: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogRegisterCoordinatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { coordenador: any },
    private pipeImage: ImagePathComplement
  ) {
    this.coordenadoraForm = this.createForm();

    if (this.data.coordenador != null) {
      this.fillForm(this.data.coordenador);
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      group: [null, [Validators.required]],
      email: [null, [Validators.required]],
      orcid: [null, []],
      lattes: [null, [Validators.required]],
      instagram: [null, []],
      twitter: [null, []],
      facebook: [null, []]
    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);

    this.coordenadoraForm.patchValue({
      name: data.name,
      group: data.group,
      email: data.email,
      orcid: data.orcid,
      lattes: data.lattes,
      instagram: data.instagram,
      twitter: data.twitter,
      facebook: data.facebook
    })
  }

  public getProfileImageCode(event: any): void {
    const that = this;
    const FR = new FileReader();
    const files = event.target.files;

    FR.addEventListener("load", function (e) {
      console.log(files[0]);
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

  public registerCoordinator(): void {
    if (this.coordenadoraForm.valid) {
      this.dialogRef.close({ save: true, coordenador: this.coordenadoraForm.value, file: this.imagePathS3 })
    }
  }

  public closeDialog(): void {
    this.dialogRef.close({ save: false });
  }
}
