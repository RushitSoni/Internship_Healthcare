import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateserviceService {
  private pageSource! : string;
  constructor() { }

  setSourcePage(source : string) : void {
    this.pageSource = source;
    console.log(source);
  }

  getSourcePage() : string {
    console.log(this.pageSource);
    return this.pageSource;
  }
}
