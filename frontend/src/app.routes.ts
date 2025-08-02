import { Routes } from '@angular/router';
import {UserListComponent} from './app/component/user-list/user-list';
import {UserAddComponent} from './app/component/user-add/user-add';
import {UserUpdateComponent} from './app/component/user-update/user-update';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'user-update', component: UserUpdateComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' }
];
