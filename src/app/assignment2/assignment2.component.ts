import { Component, OnInit } from '@angular/core';
import { CustomPoint, LocatorService } from '../service/locator.service';
import { MapLocateService } from '../assignment3/service/map-locate.service';

@Component({
  selector: 'app-assignment2',
  templateUrl: './assignment2.component.html',
  styleUrls: ['./assignment2.component.css'],
})
export class Assignment2Component implements OnInit {
  locate: CustomPoint = new CustomPoint();
  constructor(
    private locatorService: LocatorService,
    private mapLocateService: MapLocateService
  ) {}

  ngOnInit() {
    console.log(this.locatorService.locate);
  }

  onLocate() {
    this.locatorService.locate = this.locate;
    console.log(this.locate);
    if (this.locate.latitude && this.locate.longitude) {
      this.mapLocateService.clearGraphic();
      this.mapLocateService.updateGraphic(
        this.locate.latitude!,
        this.locate.longitude!
      );
    }
  }
}
