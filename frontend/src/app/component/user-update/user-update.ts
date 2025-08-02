import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatError, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {AppUsersClient} from '../../client/app-users-client';
import {NotificationService} from '../../notification/notification';

@Component({
  selector: 'user-update',
  standalone: true,
  templateUrl: './user-update.html',
  styleUrls: ['./user-update.css'],
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError]
})
export class UserUpdateComponent implements OnInit {
  userForm: FormGroup;
  href: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appUsersClient: AppUsersClient,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.href = params['href'];
      this.appUsersClient.getUser(this.href).subscribe({
        next: (user) => this.userForm.patchValue({
          name: user.name,
          email: user.email
        }),
        error: () => this.notificationService.showError('Mislukt gebruiker ophalen'),
      });
    });
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

    this.appUsersClient.updateUser(this.href, this.userForm.value).subscribe({
      next: () => this.router.navigate(['/users']),
      error: () => {
        this.notificationService.showError('Mislukt gebruiker bewerken')
      }
    });
  }
}
