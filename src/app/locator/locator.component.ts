import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { CustomPoint, LocatorService } from '../service/locator.service';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css'],
})
export class LocatorComponent implements OnChanges, DoCheck {
  locate: CustomPoint = new CustomPoint();

  constructor(
    private locatorService: LocatorService,
    private mapService: MapService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngDoCheck(): void {
    this.locate = this.locatorService.locate;
  }

  onLocate() {
    this.locatorService.locate = this.locate;
    if (this.locate.latitude && this.locate.longitude) {
      this.mapService.clearGraphic();
      this.mapService.updateGraphic(
        this.locate.latitude!,
        this.locate.longitude!
      );
    }
  }
}
