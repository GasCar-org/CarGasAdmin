import { AbstractControl, ValidatorFn } from "@angular/forms";

export class SuperClass {
    constructor() {
    }

    public static conditionalValidator(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!condition()) {
                return null;
            }
            return validator(control);
        }
    }
}
