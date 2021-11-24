
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountriesComponent } from './countries/countries.component';
import { CountriesProviders } from './countries/countries';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'international-phone-number',
  templateUrl: './international-phone-number.html',
  styleUrls: ['./international-phone-number.scss'],
})
export class InternationalPhoneNumberComponent implements OnInit {
  constructor(protected fb: FormBuilder, private modalCtrl: ModalController, private counteriesService: CountriesProviders, public domSrv: DomSanitizer) { }
  
  @Input('minlength') minlenght: number = 4;
  @Input('maxlength') maxlength: number = 12;
  @Input('defaultcountry') defaultcountry = 'us';
  @Input('required') required: boolean = true;
  @Input('allowDropdown') allowDropdown = true;
  @Input('placeholder') placeholder = 'Phone Number';
  
  @Output() onCountryChanged: EventEmitter<any> = new EventEmitter();
  @Output() onInputChange: EventEmitter<any> = new EventEmitter();
  
  phoneErrors = [];
  countries = [];
  calling_base64 = null;
  calling_codes = '+1';
  phone = null;
  mobileForm: FormGroup;
  errorKeys: any;

  ngOnInit(): void {
    this.minlenght = this.minlenght + 3;
    this.maxlength = this.maxlength + 3;
    this.countries = this.counteriesService.getCountries();
    const find = this.countries.find(o => o.country_code.toLowerCase() == this.defaultcountry.toLowerCase());
    if (find) {
      this.calling_base64 = find.country_img;
      this.calling_codes = find.calling_codes;
    }
    this.mobileForm = this.fb.group({
      phone_number: [
        '',
        Validators.compose([
          this.required ? Validators.required : null,
          Validators.minLength(this.minlenght),
          Validators.maxLength(this.maxlength),
          Validators.pattern(/^\(?\d{3}\)[ ]?\d+$/m)
        ]),
      ],
    });
    this.phoneErrors = this.getErrorMessages(
      this.required ? 'Required' : '',
      undefined,
      'Enter a valid phone number',
      undefined,
      'Min lenght must be '+ (this.minlenght - 3) +' digit',
      'Max lenght must be '+ (this.maxlength - 3) +' digit'
    );
    this.errorKeys = Object.keys(this.phoneErrors);
  }

  openCountries() {
    if (this.allowDropdown) {
      const modal = this.modalCtrl.create(
        CountriesComponent,
        {
          enableBackdropDismiss: true,
          enterAnimation: 'core-modal-lateral-transition',
          leaveAnimation: 'core-modal-lateral-transition',
          countryCodes: this.countries 
        }
      );
  
      modal.onDidDismiss((data: any) => {
        if (data) {
          this.calling_codes = data.calling_codes;
          this.defaultcountry = data.country_code;
          this.calling_base64 = data.country_img;
          this.onCountryChanged.emit(this.calling_codes);
        }
      });
      modal.present();
    }
  
  }

  changePhone(e) {
    if (e.value === null || e.value === '') {
      this.phone = null;
    } else if (e.value !== '' && e.value[0] == '+' && e.value.split(this.calling_codes).length > 1) {
      this.phone = this.maskPhoneNumber(e.value.split(this.calling_codes)[1]);
    } else {
      this.phone = this.maskPhoneNumber(this.phone);
    }
    if (e.value !== null && e.value !== '' && this.phone !== null) {
      const newPhone = this.clearphoneNumber(this.phone);
      this.onInputChange.emit(newPhone);
    }
  }
  clearphoneNumber(phone){
    let newPhone = phone.replace('(', '');
    newPhone = newPhone.replace(')', '');
    newPhone = newPhone.replace(' ', '');
    newPhone = newPhone;
    return newPhone;
  }

  maskPhoneNumber(inputTxt) {
    inputTxt = inputTxt.replace(/\D/g, '');
    inputTxt = inputTxt.replace(/(\d{0})(\d)/, '$1($2');
    inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1$2) ');
    return inputTxt;
  }

  fetchLocal(url: string): Promise<any> {
    return new Promise(function (resolve: any, reject: any) {
      const xhr = new XMLHttpRequest;
      xhr.onload = function () {
        resolve(new Response(xhr.responseText, { status: xhr.status }));
      };
      xhr.onerror = function () {
        reject(new TypeError('Local request failed'));
      };
      xhr.open('GET', url);
      xhr.send(null);
    });
  }

  getErrorMessages(requiredMsg?: string, emailMsg?: string, patternMsg?: string, urlMsg?: string, minlengthMsg?: string,
    maxlengthMsg?: string, minMsg?: string, maxMsg?: string): any {
    const errors: any = {};

    if (requiredMsg) {
      errors.required = errors.requiredTrue = requiredMsg
    }
    if (emailMsg) {
      errors.email = emailMsg
    }
    if (patternMsg) {
      errors.pattern = patternMsg
    }
    if (urlMsg) {
      errors.url = urlMsg
    }
    if (minlengthMsg) {
      errors.minlength = minlengthMsg
    }
    if (maxlengthMsg) {
      errors.maxlength = maxlengthMsg
    }
    if (minMsg) {
      errors.min = minMsg
    }
    if (maxMsg) {
      errors.max = maxMsg
    }
    return errors;
  }
}
