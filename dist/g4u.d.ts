//import $ from 'jquery';
//import * as ol from 'openlayers';

export namespace g4u {
  namespace source {
    class ServerVector extends ol.source.Source {
      constructor(options: any);
    }
  }

  class G4UMap {
    public get(prop: string): any;
    public asSoonAs(prop: string, value: any, callback: Function): void;
  }

  export function createMap(element: (HTMLElement|string|$), clientConfig: any, layerConfig: any): Promise<G4UMap>;
}