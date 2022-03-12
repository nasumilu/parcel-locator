import { Controller } from "@hotwired/stimulus";
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { View } from 'ol';

/**
 * Very basic Stimulus controlle which initalizes a map.
 */
export default class extends Controller {

    private map: Map;

    connect(): void {
        if(!(this.element instanceof HTMLDivElement)) {
            throw `Expect an HTMLDivElement`;
        }
        
        this.map = new Map({
            target: this.element,
            view: new View({
                center: [-9172019.158038441, 3459960.509376527 ],
                zoom: 9
            }),
            layers: [
                new TileLayer({source: new OSM()})
            ]
        });

        // dispatch a connected event so the geocoder controller will
        // have referenc to the map.
        this.dispatch('connected', { detail: this.map });
    }

}