import { Controller } from "@hotwired/stimulus";
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Feature, View } from 'ol';
import { Geometry } from "ol/geom";
import { FeatureProperties } from "./services_types";

/**
 * Very basic Stimulus controlle which initalizes a map.
 */
export default class extends Controller {

    static targets: string[] = ['canvas'];
    private map: Map;
    private readonly hasCanvasTarget: boolean;
    private readonly canvasTarget: HTMLDivElement|HTMLCanvasElement;

    connect(): void {
        if(!this.hasCanvasTarget) {
            throw `Expect an HTMLDivElement`;
        }
        
        this.map = new Map({
            target: this.canvasTarget,
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