import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { InternationalPhoneNumberComponent } from './international-phone-number.component';
import { InternationalPhoneNumberService } from './international-phone-number.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { CountriesComponent } from './countries/countries.component';
import { Config } from 'ionic-angular';
import { CoreModalLateralTransition } from '../classess/modal-lateral-transition';
import { CountriesProviders } from './countries/countries';

export interface LibConfig {
  apiUrl: string;
}
export const LibConfigService = new InjectionToken<LibConfig>('LibConfig');

@NgModule({
  declarations: [InternationalPhoneNumberComponent, CountriesComponent],
  imports: [CommonModule, HttpClientModule, IonicModule.forRoot({})],
  exports: [InternationalPhoneNumberComponent],
  entryComponents: [InternationalPhoneNumberComponent, CountriesComponent],
  providers: [
    InternationalPhoneNumberService,
    CountriesProviders,
  ],
})
export class InternationalPhoneNumberModule {
  constructor(private configPage: Config) {
    this.configPage.setTransition('core-modal-lateral-transition', CoreModalLateralTransition);
  }
  static forRoot(config: LibConfig): ModuleWithProviders {
    return {
      ngModule: InternationalPhoneNumberModule,
      providers: [
        {
          provide: LibConfigService,
          useValue: config,
        },
      ],
    };
  }
}
