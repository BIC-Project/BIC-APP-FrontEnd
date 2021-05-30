export class User {
  constructor(
    public userName: string,
    private _authToken: string,
    private _authTokenExpDate: Date
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
