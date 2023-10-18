import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: "dialog-group-livros-component",
  templateUrl: "./dialog-group-livros.component.html",
  styleUrls: ["./dialog-group-livros.component.scss"]
})
export class DialogGroupLivrosComponent {

  public grupoForm: FormGroup;
  public logo: any;
  public logo2: any;
  public imagePathS3: File = null;

  public imageBook: any[] = [
    { base64: null }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogGroupLivrosComponent>,
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
      titleBook: [null, [Validators.required]],
      authorsBook: [null],
      linkBook: [null, [Validators.required]],
      imagePathS3: [null, []],
      ordem: []
    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);

    this.grupoForm.patchValue({
      titleBook: data.titleBook,
      authorsBook: data.authorsBook,
      linkBook: data.linkBook,
      imagePathS3: data.imagePathS3,
      ordem: data.ordem


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
