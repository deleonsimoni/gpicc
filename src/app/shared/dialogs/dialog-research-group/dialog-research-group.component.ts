import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";

@Component({
  selector: "dialog-research-group-component",
  templateUrl: "./dialog-research-group.component.html",
  styleUrls: ["./dialog-research-group.component.scss"]
})
export class DialogResearchGroupComponent {

  public grupoForm: FormGroup;
  public logo: any;
  public logo2: any;
  public imagePathS3: File = null;
  public coordenadoraImage: File = null;
  public gallery: any[] = [
    { base64: null }
  ];

  private galleryToSend: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogResearchGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grupo: any },
    private pipeImage: ImagePathComplement
  ) {
    this.grupoForm = this.createForm();

    if (this.data.grupo != null) {
      this.fillForm(this.data.grupo);
    }

  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      type: [null, [Validators.required]],
      title: [null, [Validators.required]],
      subTitle: [null, []],
      content: [null, [Validators.required]],
      endereco: [null, []],
      enderecoGoogle: [null, []],
      telefone: [null, []],
      funcionamento: [null, []],
      email: [null, []],
      facebook: [null, []],
      youtube: [null, []],
      instagram: [null, []],
      twitter: [null, []],
      coordenadoraName: [null, []],
      galeria: [null]
    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);
    this.logo2 = this.pipeImage.transform(data.coordenadoraImage);

    data.galeria.forEach((el: any) => {
      this.gallery.push({ base64: this.pipeImage.transform(el) })
    });

    this.grupoForm.patchValue({
      type: data.type,
      title: data.title,
      subTitle: data.subTitle,
      content: data.content,
      endereco: data.endereco,
      enderecoGoogle: data.enderecoGoogle,
      telefone: data.telefone,
      funcionamento: data.funcionamento,
      email: data.email,
      facebook: data.facebook,
      youtube: data.youtube,
      instagram: data.instagram,
      twitter: data.twitter,
      coordenadoraName: data.coordenadoraName,
      galeria: data.galeria
    })
  }

  public getProfileImageCode(event: any, index?: number): void {
    const that = this;
    const FR = new FileReader();
    const files: Array<any> = event.target.files;

    FR.addEventListener("load", function (e) {
      if (index) {
        that[`logo${index}`] = e.target.result;
      } else {
        that.logo = e.target.result;
      }
    });

    if (files.length > 0) {
      if (index) {
        that.coordenadoraImage = files[0];
      } else {
        that.imagePathS3 = files[0];
      }

      FR.readAsDataURL(files[0]);
    } else {
      that.logo = null;
      that.logo2 = null;
      that.coordenadoraImage = null;
      that.imagePathS3 = null;
    }
  }

  setGalleryImage(event: any, index: number) {
    const that = this;
    const FR = new FileReader();
    const files = event.target.files;

    FR.addEventListener("load", function (e) {
      if (index == 0) {
        that.gallery.push({ base64: e.target.result });
        that.galleryToSend.push(files[0]);
      } else {
        that.gallery[index]["base64"] = e.target.result;
        that.galleryToSend[index] = files[0];
      }
    });

    if (files.length > 0) {
      FR.readAsDataURL(files[0]);
    }
  }

  public registerCoordinator(): void {
    if (this.grupoForm.valid) {
      const files = [];
      files.push(this.imagePathS3);
      files.push(this.coordenadoraImage);
      files.push(this.galleryToSend);

      let galeria: any[] = [];
      this.gallery.splice(1)
        .forEach(el => {
          if (el.base64.includes("leped.s3")) {
            galeria.push("images/" + el.base64.replace(/.+images\//, ""));
          }
        });

      this.grupoForm.patchValue({ galeria });
      this.dialogRef.close({ save: true, grupo: this.grupoForm.value, files })
    }
  }

  public closeDialog(): void {
    this.gallery = [];
    this.dialogRef.close({ save: false });
  }

  public deleteImage(index: number) {
    this.gallery.splice(index, 1);

    if (this.galleryToSend && this.galleryToSend.length > 0) {
      this.galleryToSend.splice(index, 1);
    }
  }
}
