export interface AppUsersPage {
  users: AppUser[];
  total: number
}

export interface NewAppUser {
  name: string;
  email: string
}

export interface AppUser {
  name: string;
  email: string;
  url: string
}

export interface FetchParams {
  page: number;
  size: number;
  sort: string;
}
