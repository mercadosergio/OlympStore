import { FormControl } from "@angular/forms";

export interface IFormRegister {
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    role: FormControl<string>;
}
