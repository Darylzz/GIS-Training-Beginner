import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { LocatorService } from 'src/app/service/locator.service';
import { MapLocateService } from '../service/map-locate.service';

@Component({
  selector: 'app-map-locate',
  templateUrl: './map-locate.component.html',
  styleUrls: ['./map-locate.component.css'],
})
export class MapLocateComponent implements OnInit {
  @ViewChild('viewMap', { static: true }) viewMap: ElementRef;
  constructor(
    private mapLocateService: MapLocateService,
    private locatorService: LocatorService
  ) {}

  ngOnInit(): void {
    this.mapLocateService.createMap(this.viewMap.nativeElement);
  }
}
