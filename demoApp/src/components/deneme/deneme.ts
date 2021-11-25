import { Component } from '@angular/core';

/**
 * Generated class for the DenemeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'deneme',
  templateUrl: 'deneme.html'
})
export class DenemeComponent {

  text: string;

  constructor() {
    console.log('Hello DenemeComponent Component');
    this.text = 'Hello World';
  }

}
