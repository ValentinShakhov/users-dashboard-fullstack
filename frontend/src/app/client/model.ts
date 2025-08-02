export interface AppUsersPageResponse {
  _embedded: Embedded,
  page: Page
}

interface AppUserPageResponse {
  name: string,
  email: string,
  _links: Links
}

interface Embedded {
  appUsers: AppUserPageResponse[]
}

interface Links {
  self: Self
}

interface Self {
  href: string
}

interface Page {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}
