import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [SharedModule, AuthRoutingModule, NgxMaskModule.forRoot(), BsDatepickerModule.forRoot(),],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule { }
