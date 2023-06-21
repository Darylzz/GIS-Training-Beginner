import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { LocatorService } from 'src/app/service/locator.service';
import { MapLocateService } from '../service/map-locate.service';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
@Component({
  selector: 'app-map-locate',
  templateUrl: './map-locate.component.html',
  styleUrls: ['./map-locate.component.css'],
})
export class MapLocateComponent implements OnInit {
  @ViewChild('viewMap', { static: true }) viewMap: ElementRef;
  latitude: number | null;
  longitude: number | null;
  title: string;
  bookmark: any[] = [];
  constructor(private mapLocateService: MapLocateService) {}

  ngOnInit(): void {
    this.mapLocateService.createMap(this.viewMap.nativeElement);
    this.mapLocateService.mapView?.when(() => {
      this.mapLocateService.mapView?.on('click', (event) => {
        console.log(event);
        const mapPoint = event.mapPoint;
        const latitude = mapPoint.latitude;
        const longitude = mapPoint.longitude;
        this.latitude = latitude;
        this.longitude = longitude;
        const point = new Point({
          latitude: latitude,
          longitude: longitude,
        });
        const marker = new SimpleMarkerSymbol({
          color: [0, 0, 255, 0.3],
          outline: {
            color: 'tranparent',
            width: 2,
          },
        });
        const graphic = new Graphic({
          geometry: point,
          symbol: marker,
        });
        this.mapLocateService.mapView?.graphics.removeAll();
        this.mapLocateService.mapView?.goTo(point);
        this.mapLocateService.mapView?.graphics.add(graphic);
      });
    });
  }

  realTime() {
    if (this.longitude && this.latitude) {
      const point = new Point({
        latitude: this.latitude,
        longitude: this.longitude,
      });
      const marker = new SimpleMarkerSymbol({
        color: [0, 0, 255, 0.3],
        outline: {
          color: 'tranparent',
          width: 2,
        },
      });
      const graphic = new Graphic({
        geometry: point,
        symbol: marker,
      });
      this.mapLocateService.mapView?.graphics.removeAll();
      this.mapLocateService.mapView?.goTo(point);
      this.mapLocateService.mapView?.graphics.add(graphic);
    }
  }

  clickAddBookmark() {
    const objBookmark = {
      title: this.title,
      latitude: this.latitude,
      longitude: this.longitude,
    };
    this.bookmark.push(objBookmark);
    this.clickClearLocator();
  }

  clickClearLocator() {
    this.latitude = null;
    this.longitude = null;
    this.title = '';
    this.mapLocateService.mapView?.graphics.removeAll();
  }

  clickGetInfo(value: any) {
    this.title = value.title;
    this.latitude = value.latitude;
    this.longitude = value.longitude;
    const point = new Point({
      latitude: value.latitude,
      longitude: value.longitude,
    });
    const marker = new SimpleMarkerSymbol({
      color: [0, 0, 255, 0.3],
      outline: {
        color: 'tranparent',
        width: 2,
      },
    });
    const graphic = new Graphic({
      geometry: point,
      symbol: marker,
    });
    this.mapLocateService.mapView?.graphics.removeAll();
    this.mapLocateService.mapView?.goTo(point);
    this.mapLocateService.mapView?.graphics.add(graphic);
  }

  clickDelete(index: number) {
    this.bookmark.splice(index, 1);
    this.clickClearLocator();
  }
}
