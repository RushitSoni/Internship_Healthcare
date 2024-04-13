import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RespondentNavigateService {

  private fill! : string;
  private login : boolean = false;
  constructor() { }

  setLogin()
  {
    this.login = !this.login;
  }

  getLogin() : boolean {
    return this.login;
  }

  setFillRoute(name : string)
  {
    this.fill = name;
  }

  getFillRoute()
  {
    return this.fill;
  }
}
