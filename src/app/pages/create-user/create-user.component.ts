import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { forbiddenNameValidator } from '../../validators/forbidden-name.validator';
import { UserService } from '../../services/user.service';

function checkEmailNotTaken(control: AbstractControl): Observable<ValidationErrors | null> {
  const takenEmails = ['admin@test.com', 'samuel@test.com'];
  return of(control.value).pipe(
    delay(1000),
    map((email) => (takenEmails.includes(email) ? { emailTaken: true } : null)),
  );
}

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    email: ['', [Validators.required, Validators.email], [checkEmailNotTaken]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['viewer', Validators.required],
    skills: this.fb.array([this.fb.control('')]),
  });

  get skills() {
    return this.userForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const { name, email, password, role } = this.userForm.value;
      this.userService
        .createUser({ name: name!, email: email!, password: password!, role: role! })
        .subscribe(() => {
          this.router.navigate(['/users']);
        });
    }
  }
}
