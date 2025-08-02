import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, switchMap} from 'rxjs';
import {AppUser, AppUsersPage, FetchParams, NewAppUser} from '../model/model';
import {AppUsersPageResponse} from './model';

@Injectable({providedIn: 'root'})
export class AppUsersClient {

  private readonly url = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  fetchUsers(fetchParamsObservable: Observable<FetchParams>): Observable<AppUsersPage> {
    return fetchParamsObservable.pipe(
      switchMap((fetchParams) => {
        const httpParams = new HttpParams()
          .set('page', fetchParams.page)
          .set('size', fetchParams.size)
          .set('sort', fetchParams.sort);

        return this.http.get<AppUsersPageResponse>(this.url, {params: httpParams});
      }),
      map(response => this.toAppUserPage(response))
    );
  }

  toAppUserPage(response: AppUsersPageResponse): AppUsersPage {
    return {
      users: (response._embedded?.appUsers || [])
        .map(responseAppUser => ({
          name: responseAppUser.name,
          email: responseAppUser.email,
          url: responseAppUser._links.self.href
        })),
      total: response.page?.totalElements ?? 0
    }
  }

  createUser(user: NewAppUser) {
    return this.http.post(this.url, user)
  }

  deleteUser(href: string) {
    return this.http.delete(href)
  }

  updateUser(href: string, user: NewAppUser) {
    return this.http.put(href, user);
  }

  getUser(href: string): Observable<AppUser> {
    return this.http.get<AppUser>(href);
  }
}
