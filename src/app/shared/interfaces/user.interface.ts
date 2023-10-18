export interface User {
  _id: string;
  fullname: string;
  createdAt: string;
  roles: string[];
  isAdmin: boolean;
  isGeped: boolean;
  isGeprod: boolean;
  isGedoc: boolean
}
