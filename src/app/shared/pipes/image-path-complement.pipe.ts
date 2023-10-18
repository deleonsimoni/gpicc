import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "imagePathComplement"
})
export class ImagePathComplement implements PipeTransform {

  transform(value: any, ...args: any[]) {
    if (typeof value == "string") {
      return 'https://leped.s3.sa-east-1.amazonaws.com/'.concat(value)
    }
  }

}
