import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor() { }
  inputChange(ev) {
    console.log(ev);
  }
  data(ev) {
    console.log(ev);
  }
}
