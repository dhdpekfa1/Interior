declare global {
  namespace kakao {
    namespace maps {
      interface MapOptions {
        center: LatLng;
        level?: number;
      }

      class Map {
        constructor(container: HTMLElement, options: MapOptions);
      }

      class LatLng {
        constructor(latitude: number, longitude: number);
      }

      interface MarkerOptions {
        position: LatLng;
      }

      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
      }

      function load(callback: () => void): void;

      interface LoadFunction {
        (callback: () => void): void;
      }
    }

    const maps: {
      Map: typeof maps.Map;
      LatLng: typeof maps.LatLng;
      Marker: typeof maps.Marker;
      load: maps.LoadFunction;
    };
  }

  interface Window {
    kakao: typeof kakao;
  }
}
export {};
