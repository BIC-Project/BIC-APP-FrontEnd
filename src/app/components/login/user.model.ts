export class User {
  constructor(
    public userName: string,
    public _authToken: string,
    private _authTokenExpDate: Date
  ) {}

  get authToken() {

    if(!this._authTokenExpDate || new Date() > this._authTokenExpDate)
        return null;
    return this._authToken;
  }
}
