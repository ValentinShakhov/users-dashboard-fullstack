import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatError, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {AppUsersClient} from '../../client/app-users-client';
import {NotificationService} from '../../notification/notification';

@Component({
  selector: 'user-add',
  standalone: true,
  templateUrl: './user-add.html',
  styleUrls: ['./user-add.css'],
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError]
})
export class UserAddComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private appUsersClient: AppUsersClient,
              private notificationService: NotificationService) {
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      }
    );
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.appUsersClient.createUser(this.userForm.value).subscribe({
      next: () => this.router.navigate(['/users']),
      error: () => this.notificationService.showError('Mislukt gebruiker toevoegen')
    });
  }
}

