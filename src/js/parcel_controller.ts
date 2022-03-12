
import { Controller } from "@hotwired/stimulus";
import VectorSource, { VectorSourceEvent } from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Feature, Map } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { parcelStyle } from "./feature_style";
import { Point } from "ol/geom";
import { toStringXY } from "ol/coordinate";

const SERVICE_URI = 'https://services.arcgis.com/cNo3jpluyt69V8Ek/arcgis/rest/services/PublicParcel/FeatureServer/0/query';
/**
 * Class listens for changes to the geocoder controllers vector source does one of two things:
 * 
 * 1. When the geocoder's vector source emits a `clear` event this layers source is clear also
 * 2. When the geocoder's vector source emits an `addfeature` event this class will perform a 
 *    spatial join (intersect) using the Alachua County Property Appaiser (ACPA) web feature service
 *    to look up the property owner who's parcel intersects the newly added feature. 
 * 
 * @see https://services.arcgis.com/cNo3jpluyt69V8Ek/arcgis/rest/services/PublicParcel/FeatureServer/0/query
 */
export default class extends Controller {

    private layer: VectorLayer<VectorSource>;
    private source: VectorSource;
    private map: Map;
    private readonly reader: GeoJSON = new GeoJSON();

    connect() {

        this.source = new VectorSource();
        this.layer = new VectorLayer({ source: this.source })

        this.element.addEventListener('geocoder:connected', evt => {
            let addressVectorSource:VectorSource = (evt as CustomEvent<VectorSource>).detail;
            addressVectorSource.on('clear', evt => this.source.clear());
            addressVectorSource.on('addfeature', this.intersect.bind(this));
        });
        
        this.element.addEventListener('map:connected', evt => {
            this.map = (evt as CustomEvent<Map>).detail;
            this.map.addLayer(this.layer)
        });
        this.source.on('addfeature', this.display.bind(this));
    }

    private requestBody(feature: Feature): FormData {
        const geometry: Point = feature.getGeometry() as Point;
        const body = new FormData();
        body.append('geometry', `${toStringXY(geometry.getCoordinates())}`);
        body.append('geometryType', 'esriGeometryPoint');
        body.append('inSR', '3857');
        body.append('outSR', '3857');
        body.append('spatialRel', 'esriSpatialRelIntersects');
        body.append('outFields', '*');
        body.append('returnGeometry', 'true');
        body.append('f', 'pgeojson') 

        return body;
    }

    display(evt: VectorSourceEvent) {
        evt.feature.setStyle(parcelStyle(evt.feature));
        this.map.getView().fit(this.source.getExtent());
    }

    async intersect(evt: VectorSourceEvent) {     
        const response = await fetch(SERVICE_URI, {
            method: 'POST',
            body: this.requestBody(evt.feature)
        });
        const data = await response.json();
        this.source.addFeatures(this.reader.readFeatures(data));
    }

}