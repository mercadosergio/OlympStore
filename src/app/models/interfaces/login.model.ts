import { FormControl } from "@angular/forms";

export interface ILogin {
  email: string;
  password: string;
}

export interface IFormLogin {
  email: FormControl<string>;
  password: FormControl<string>;
}
