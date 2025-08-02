import {Component, OnDestroy} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {AppUsersClient} from '../../client/app-users-client';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {BehaviorSubject, combineLatest, map, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AppUser, FetchParams} from '../../model/model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../notification/notification';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.html',
  imports: [MatCard, MatTableModule, MatSort, MatIcon, MatPaginator, MatSortModule]
})
export class UserListComponent implements OnDestroy {
  private subscription = new Subscription();

  private refreshTrigger = new BehaviorSubject<void>(undefined);
  private page = new BehaviorSubject<number>(0);
  private size = new BehaviorSubject<number>(10);
  private sort = new BehaviorSubject<string>('name,asc');

  displayedColumns = ['name', 'email', 'actions'];
  dataSource = new MatTableDataSource<AppUser>([]);
  total = 0;

  constructor(private appUsersClient: AppUsersClient, private router: Router, private notificationService: NotificationService) {
    const fetchParams = combineLatest([this.page, this.size, this.sort, this.refreshTrigger])
      .pipe(map(([latestPage, latestSize, latestSort]) => {
        let fetchParams: FetchParams = {
          page: latestPage,
          size: latestSize,
          sort: latestSort
        };
        return fetchParams;
      }));

    this.subscription.add(
      this.appUsersClient.fetchUsers(fetchParams)
        .subscribe({
            next: (appUsersPage) => {
              this.dataSource.data = appUsersPage.users;
              this.total = appUsersPage.total;
            },
            error: () => this.notificationService.showError('Mislukt gebruikers ophalen')
          }
        )
    );
  }

  onSort(event: Sort): void {
    if (event.direction) {
      this.setSort(`${event.active},${event.direction}`);
    }
  }

  setSort(sort: string): void {
    if (this.sort.value !== sort) {
      this.sort.next(sort);
    }
  }

  onPage(event: PageEvent): void {
    this.setPage(event.pageIndex);
    this.setSize(event.pageSize);
  }

  setPage(page: number): void {
    if (this.page.value !== page) {
      this.page.next(page);
    }
  }

  setSize(size: number): void {
    if (this.size.value !== size) {
      this.size.next(size);
    }
  }

  delete(user: AppUser): void {
    this.appUsersClient.deleteUser(user.url).subscribe({
      next: () => this.refresh(),
      error: err => this.notificationService.showError('Mislukt gebruiker verwijderen'),
    });
  }

  edit(user: AppUser): void {
    this.router.navigate(['/user-update'], {queryParams: {href: user.url}});
  }

  refresh(): void {
    this.refreshTrigger.next();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
