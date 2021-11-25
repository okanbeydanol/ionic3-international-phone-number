# ionic3-international-phone-number
A simple international telephone number input. Allows you to create a phone number field with country dropdown. 

![Plugin preview](https://raw.githubusercontent.com/okanbeydanol/ionic3-international-phone-number/master/demoApp/video/international.gif)


## Installation

To install this library, run:

```bash
$ npm install ionic3-international-phone-number --save
```

## Consuming your library

Once you have installed it you can import `InternationalPhoneNumberModule` from `ionic3-international-phone-number` in any application module. E.g.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { InternationalPhoneNumberModule } from 'ionic3-international-phone-number';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // InternationalPhoneNumberModule module
    InternationalPhoneNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once it is imported, you can use `international-phone-number`:

```xml
<!-- app.component.html -->
 <international-phone-number (onInputChange)="inputChange($event)" (onCountryChanged)="data($event)" [required]="false" [defaultcountry]="'us'" [placeholder]="'Phone Number'" [minlength]="5" [maxlength]="13"></international-phone-number>
```

### Attributes/Options:
       defaultcountry : An ISO 3166 country code can be provided to set default country selected.
       placeholder: A placeholder text which would be displayed in input widget
       required: Indicates whether it's required or not
       allowDropdown: Indicates whether to allow selecting country from dropdown

## License

MIT
