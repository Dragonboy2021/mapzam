import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ErrorService } from './services/error.service';
import { AuthService } from './services/auth.service';
import { CountryService } from './services/country.service';

@NgModule({
  declarations: [],
  providers: [ AuthService, CountryService, { provide: HTTP_INTERCEPTORS, useClass: ErrorService, multi: true}, AuthGuard, RoleGuard]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}