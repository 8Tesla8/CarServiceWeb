import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './share/footer.component';
import { HeaderComponent } from './share/header.component';
import { AppointmentComponent } from './page/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: 'appointment', component: AppModule },
      { path: '', redirectTo: 'appointment', pathMatch: 'full' },   // default route
      { path: '**', redirectTo: 'appointment', pathMatch: 'full' }, // 404 not found page
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
