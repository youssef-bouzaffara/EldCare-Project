import { FormControl } from '@angular/forms';
export function passwordMatchValidator(control: FormControl): {[s: string]: boolean} {
    const formGroup = control.parent;
    if (formGroup) {
      const password = formGroup.controls['pwd'];
      const confirmPassword = formGroup.controls['confirmPwd'];
      if (password.value !== confirmPassword.value) {
        return {'passwordsNotMatch': true};
      }
    }
    return null;
  }
  