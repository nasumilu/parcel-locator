import { Application } from "@hotwired/stimulus"
import MapController from "./map_controller"
import GeocoderController from "./geocoder_controller";
import ParcelController from "./parcel_controller";

const Stimulus = Application.start();
Stimulus.register('map', MapController);
Stimulus.register('geocoder', GeocoderController);
Stimulus.register('parcel', ParcelController);

