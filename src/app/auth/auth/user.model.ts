
export class User {

  constructor(
    private id: string,
    private email: string,
    private _token: string,
    private _tokenExpiration: Date
  ) { }

  get token() {
    if(!this._tokenExpiration || new Date() > this._tokenExpiration) {
      return null;
    }
    return this._token;
  }
}
