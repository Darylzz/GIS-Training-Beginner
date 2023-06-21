import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Locate from '@arcgis/core/widgets/Locate';

export class MapLocateService {
  map: Map | null;
  mapView: MapView | null;

  createMap(container: any) {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      map: this.map,
      container: container,
      center: [100.46, 13.74],
      zoom: 8,
    });

    const locate = new Locate({
      view: this.mapView,
    });

    this.mapView.ui.add(locate, 'top-left');
  }
}
