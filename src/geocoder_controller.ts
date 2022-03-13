import { Controller } from "@hotwired/stimulus";
import { Feature, Map } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { ADDRESS_STYLE } from "./feature_style";
import { Point } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import { AddressCandidate, AddressCanidateResults } from "./services_types";
import { Extent } from "ol/extent";


const GEOCODER_URI: string = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';

/**
 * Class which obtains a single address line from input and attempts to geocode using
 * ESRI World Geocoder. 
 * 
 * @see https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm
 */
export default class extends Controller {

    static targets: string[] = [ 'address', 'spinner', 'popover' ];
    private source: VectorSource;
    private map: Map;
    private layer: VectorLayer<VectorSource>;
    readonly hasAddressTarget: boolean;
    readonly spinnerTarget: HTMLDivElement;
    readonly addressTarget: HTMLInputElement;

    connect(): void {

        // Must be connected to a form element, because this controller listens for
        // a submit event
        if(! (this.element instanceof HTMLFormElement)) {
            throw `Expected an html form element!`;
        }

        // if no input[type='text'] this controller is, well useless.
        if(!this.hasAddressTarget && !(this.addressTarget instanceof HTMLInputElement)) {
            throw `Expected address target as an instance of HTMLInputElement`;
        }

        this.source = new VectorSource();
        this.layer = new VectorLayer({
            source: this.source,
            minResolution: 15
        });

        // single that this controller is connected
        this.dispatch('connected', { detail: this.source } );

        // listen for when the map controller is connected and add this controllers layer
        this.element.addEventListener('map:connected', (evt) => {
            this.map = (evt as CustomEvent<Map>).detail;
            this.map.addLayer(this.layer);
        });
        
    }

    /**
     * Gets a url needed for the geocoder
     */
    private get url() {
        let input: string = this.addressTarget.value;
        const params: URLSearchParams = new URLSearchParams({
            SingleLine: input,      // are address is sent as a single line
            outSR: '3857',          // EPSG:3857 spatial reference system id
            sourceCountry: 'USA',   // search is limited to the USA
            outFields: '*',         // give me all fields
            forStorage: 'false',    // this service is free unless the results is databased
            f: 'json',              // return json results
        });
        return `${GEOCODER_URI}?${params}`;
    }

    // method which handles the submit event
    locate(evt: Event) {
        evt.preventDefault(); // prevent the form from submitting (page refresh)
        this.source.clear();  // clear any existing address canidates from the map (new search)
        this.spinnerTarget.classList.remove('d-none');
        // Fetch API (get new set of address canidates)
        fetch(this.url)
            // get the response from the server and unmarshal (deserialize) JSON 
            .then((response: Response) => response.json())
            // add the address canidates to the map
            .then((data:  AddressCanidateResults) => {
                console.log(data);
                if(data.candidates.length === 0) {
                    throw `Unable to gecode address ${this.addressTarget.value}`;
                }
                data.candidates.forEach( (candidate: AddressCandidate) => {
                    let coordinate: Coordinate = [candidate.location.x, candidate.location.y];
                    let feature = new Feature({geometry: new Point(coordinate)});
                    feature.setProperties(Object.assign({name: 'address', popover: this } , candidate.attributes));
                    feature.setStyle(ADDRESS_STYLE);
                    this.source.addFeature(feature);
                });
                return this.source.getExtent();
            })
            .then((extent: Extent) => this.map.getView().fit(extent))
            .catch(err => {
                // handle error here.
            }).finally(() => this.spinnerTarget.classList.add('d-none'));

    }

}