import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { LocatorComponent } from './locator/locator.component';
import { MapComponent } from './map/map.component';
import { MapService } from './service/map.service';
import { LocatorService } from './service/locator.service';
import { RouterModule } from '@angular/router';
import { Assignment11Component } from './assignment1.1/assignment1.1.component';
import { Assignment12Component } from './assignment1.2/assignment1.2.component';
import { Assignment2Component } from './assignment2/assignment2.component';
import { Assignment3Component } from './assignment3/assignment3.component';
import { MapLocateComponent } from './assignment3/map-locate/map-locate.component';
import { MapLocateService } from './assignment3/service/map-locate.service';
import { Assignment13Component } from './assignment1.3/assignment1.3.component';
import { FormComponent } from './assignment1.3/form/form.component';
import { CardComponent } from './assignment1.3/card/card.component';
import { BookmarkComponent } from './assignment3/bookmark/bookmark.component';
import { InputTextModule } from 'primeng/inputtext';

const routes = [
  { path: '1.1', component: Assignment11Component },
  { path: '1.2', component: Assignment12Component },
  { path: '1.3', component: Assignment13Component },
  { path: '2', component: Assignment2Component },
  { path: '3', component: Assignment3Component },
  { path: '4', component: MapComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LocatorComponent,
    MapComponent,
    Assignment11Component,
    Assignment12Component,
    Assignment2Component,
    MapLocateComponent,
    Assignment3Component,
    Assignment13Component,
    FormComponent,
    CardComponent,
    BookmarkComponent,
  ],
  imports: [
    BrowserModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    RouterModule.forRoot(routes),
  ],
  providers: [MapService, LocatorService, MapLocateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
