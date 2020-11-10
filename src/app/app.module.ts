import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedmoduleModule} from './SharedModule/sharedmodule.module';
import {SharedcomponentModule} from './SharedComponent/sharedcomponent.module';
import {Ng5SliderModule} from 'ng5-slider';
import {ClickOutsideModule} from 'ng-click-outside';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        SharedmoduleModule,
        CarouselModule,
        SharedcomponentModule,
        Ng5SliderModule,
        ClickOutsideModule,
        ProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
