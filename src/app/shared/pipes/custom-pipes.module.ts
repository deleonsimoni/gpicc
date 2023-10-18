import { NgModule } from "@angular/core";
import { ImagePathComplement } from "./image-path-complement.pipe";
import { TruncateStringPipe } from './truncate-string.pipe';
import { MaskCpfPipe } from './mask-cpf.pipe';
import { CepPipe } from './cep.pipe';
import { TimeSocialPipe } from './time-social.pipe';

@NgModule({
  declarations: [
    ImagePathComplement,
    TruncateStringPipe,
    MaskCpfPipe,
    CepPipe,
    TimeSocialPipe
  ],
  exports: [
    ImagePathComplement,
    TruncateStringPipe,
    MaskCpfPipe,
    CepPipe,
    TimeSocialPipe
  ],
  providers: [
    ImagePathComplement,
    TruncateStringPipe,
    MaskCpfPipe,
    CepPipe,
    TimeSocialPipe
  ]
})
export class CustomPipesModule { }
