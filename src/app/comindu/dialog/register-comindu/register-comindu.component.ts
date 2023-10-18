import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImagePathComplement } from "@app/shared/pipes/image-path-complement.pipe";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CominduService } from "@app/comindu.service";

@Component({
  selector: 'app-register-comindu',
  templateUrl: './register-comindu.component.html',
  styleUrls: ['./register-comindu.component.scss']
})
export class RegisterCominduComponent implements OnInit {

  public form: FormGroup;
  public logo: any;
  imagePathS3: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags = [];
  cor;
  carregando;
  admins;
  color;

  constructor(
    private formBuilder: FormBuilder,
    private cominduService: CominduService,
    private dialogRef: MatDialogRef<RegisterCominduComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any },
    private pipeImage: ImagePathComplement
  ) {
    this.form = this.createForm();

    if (this.data.form != null) {
      this.fillForm(this.data.form);

    }
  }

  ngOnInit(): void {
    this.listAdmins();
  }

  public listAdmins() {
    this.carregando = true;
    this.cominduService.listAdmins()
      .subscribe((res: any) => {
        this.carregando = false;
        this.admins = res;
      }, err => {
        this.carregando = false;
      });
  }


  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      content: [null, []],
      image: [null, []],
      owners: [null, []],
      tags: [null, []]
    });
  }

  private fillForm(data: any): void {
    this.logo = this.pipeImage.transform(data.imagePathS3);
    this.tags = this.data.form.tags;

    this.form.patchValue({
      name: data.name,
      content: data.content,
      tags: data.tags,
      owners: data.owners
    })
  }

  public compare(c1, c2): boolean {
    return c1 && c2 ? c1._id === c2._id : false;
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
      this.form.value.tags = this.tags;
      this.form.value.cor = this.cor;
      this.dialogRef.close({ save: true, form: this.form.value, file: this.imagePathS3 })
    }
  }

  public closeDialog(): void {
    this.dialogRef.close({ save: false });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }


}
