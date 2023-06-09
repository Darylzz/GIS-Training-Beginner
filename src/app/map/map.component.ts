import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MapService } from '../service/map.service';
import { LocatorService } from '../service/locator.service';
import Graphic from '@arcgis/core/Graphic';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import IdentifyParameter from '@arcgis/core/rest/support/IdentifyParameters';
import { identify } from '@arcgis/core/rest/identify';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('viewMap', { static: true }) viewMap: ElementRef;
  graphic: Graphic;

  constructor(
    private mapService: MapService,
    private locatorService: LocatorService
  ) {}

  ngOnInit(): void {
    this.mapService.createMap(this.viewMap.nativeElement);
    const identifyLayer =
      'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer';

    const layer = new MapImageLayer({
      url: identifyLayer,
    });

    this.mapService.map?.add(layer);

    this.mapService.mapView?.when(() => {
      this.mapService.mapView?.on('click', (event: any) => {
        const { latitude, longitude } = event.mapPoint;
        this.locatorService.emitLocator(latitude, longitude);

        const params = new IdentifyParameter();
        if (this.mapService.mapView) {
          params.geometry = event.mapPoint;
          params.mapExtent = this.mapService.mapView?.extent;
          params.width = this.mapService.mapView?.width;
          params.height = this.mapService.mapView.height;
          params.tolerance = 3;
          params.layerIds = [3];
          params.returnGeometry = true;
        }

        identify(identifyLayer, params)
          .then((response) => {
            // console.log(response.results);

            const result = response.results[0].feature.attributes;
            const stateName = result.STATE_NAME;
            const people = result.POP2007;
            const area = result.Shape_Area;
            const geometry = response.results[0].feature.geometry;
            this.mapService.mapView?.popup.open({
              title: stateName,
              location: event.mapPoint,
              content: `<p>Population(2007): ${this.formatThousandSeparate(
                people
              )}</p> <p>Area: ${this.formatThousandSeparate(area)}</p>`,
            });

            const polygon = new Polygon({
              rings: geometry.rings,
              spatialReference: geometry.spatialReference,
            });

            const symbol = new SimpleFillSymbol({
              color: 'blue',
              outline: {
                color: 'tranparent',
                width: 2,
              },
            });

            const graphic = new Graphic({
              geometry: polygon,
              symbol: symbol,
            });

            this.mapService.mapView?.graphics.remove(this.graphic);

            this.graphic = graphic;
            this.mapService.mapView?.graphics.add(graphic);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }

  formatThousandSeparate(currencyVal: number) {
    if (currencyVal) {
      let parts = currencyVal.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
    return currencyVal;
  }
}
