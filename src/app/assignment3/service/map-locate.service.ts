import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Locate from '@arcgis/core/widgets/Locate';
import Graphic from '@arcgis/core/Graphic';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Point from '@arcgis/core/geometry/Point';

export class MapLocateService {
  map: Map | null;
  mapView: MapView | null;
  graphic: Graphic | null;

  createMap(container: any) {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      map: this.map,
      container: container,
      center: [100, 13],
      zoom: 6,
    });

    const locate = new Locate({
      view: this.mapView,
    });

    this.mapView.ui.add(locate, 'top-left');
  }

  updateGraphic(latitude: number, longitude: number) {
    const point = new Point({
      latitude: latitude,
      longitude: longitude,
    });

    const marker = new SimpleMarkerSymbol({
      color: 'blue',
      outline: {
        color: 'tranparent',
        width: 2,
      },
    });

    this.graphic = new Graphic({
      symbol: marker,
      geometry: point,
    });

    this.mapView?.graphics.add(this.graphic);
    this.mapView?.goTo(point);
  }

  clearGraphic() {
    if (this.graphic) {
      this.mapView?.graphics.remove(this.graphic);
    }
  }
}
