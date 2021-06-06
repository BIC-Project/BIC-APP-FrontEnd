import { Roles } from "./roles.enum";

export class User {
  constructor(
    public userName: string,
    private _authToken: string,
    private _authTokenExpDate: Date,
    public roles: Roles
  ) { }

  get authToken() {

    if (!this._authTokenExpDate || new Date() > this._authTokenExpDate)
      return null;
    return this._authToken;
  }

  get authTokenExpDate() {
    return this._authTokenExpDate;
  }
}
