import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TextInput } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  @ViewChild('searchInput') searchInput: TextInput;
  constructor(public navParams: NavParams, public viewCtrl: ViewController, private cdr: ChangeDetectorRef, public domSrv: DomSanitizer) {
    this.countryCodes = this.navParams.data.countryCodes;
    this.countriesClone = this.countryCodes;
  }

  inputFocus = false;
  countries = [];
  countriesClone = [];
  searchCountries: any = [];
  search = false;
  countryCodes;
  loading = false;
  i = 0;

  ngOnInit() {
    this.countries = this.countryCodes.slice(this.i, 30);
    this.i = 30;
  }

  scrollContent(ev) {
    const currentScroll = +ev.scrollElement.scrollTop;
    const scrollHeight = +ev.scrollElement.scrollHeight - +ev.scrollElement.clientHeight;
    if (!this.search) {
      if (currentScroll >= scrollHeight - 100 && !this.loading) {
        this.loading = true;
        if (this.countries.length >= this.countriesClone.length - 10) {
          var spliceCountry = this.countryCodes.slice(
            this.i,
            this.countriesClone.length
          );
          spliceCountry.forEach((country) => {
            this.countries.push(country);
          });
        } else {
          var spliceCountry = this.countryCodes.slice(this.i, this.i + 10);
          spliceCountry.forEach((country) => {
            this.countries.push(country);
          });
        }
        this.i += 10;
        this.loading = false;
        this.cdr.detectChanges();
      }
    } else {
      if (currentScroll >= scrollHeight - 100 && !this.loading) {
        this.loading = true;
        if (this.countries.length >= this.searchCountries.length - 10) {
          var spliceCountry = this.searchCountries.slice(
            this.i,
            this.searchCountries.length
          );
          spliceCountry.forEach((country) => {
            this.countries.push(country);
          });
        } else {
          var spliceCountry = this.searchCountries.slice(this.i, this.i + 10);
          spliceCountry.forEach((country) => {
            this.countries.push(country);
          });
        }
        this.i += 10;
        this.loading = false;
        this.cdr.detectChanges();
      }
    }
  }

  textSearch(ev) {
    this.search = true;
    this.i = 0;
    if (ev.value == '') {
      this.search = false;
      this.countries = this.countriesClone;
      return;
    }
    const searchCountries = this.countriesClone.filter(
      (o) => o.country_name.toLowerCase().indexOf(ev.value.toLowerCase()) !== -1
    );
    this.searchCountries = searchCountries;
    this.countries = searchCountries.slice(this.i, 10);
    this.i = 10;
    this.cdr.detectChanges();
  }

  sendData(data) {
    this.viewCtrl.dismiss(data);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchInput.setFocus();
    }, 30);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
