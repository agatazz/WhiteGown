export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private tokenExpDate: Date
  ) {}

  get token() {
    if (!this.tokenExpDate || this.tokenExpDate <= new Date()) {
        return null;
    } 
    return this._token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    return this.tokenExpDate.getTime() - new Date().getTime();
  }
}
