export class CustomPoint {
  latitude: number | null = null;
  longitude: number | null = null;
}

export class LocatorService {
  locate = new CustomPoint();

  emitLocator(latitude: number, longitude: number) {
    this.locate.latitude = latitude;
    this.locate.longitude = longitude;
  }
}
