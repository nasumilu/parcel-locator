import { Feature } from "ol";
import { getCenter } from "ol/extent";
import {Style, Circle, Fill, Stroke, Text } from "ol/style";
import { ParceProperties } from "./services_types";

// Style for the address canidate features (Point)
export const ADDRESS_STYLE = new Style({
    image: new Circle({
        radius: 5,
        stroke: new Stroke({
            color: '#336699',
            width: 1.25
        }),
        fill: new Fill({
            color: 'rgba(51,102,153,0.5)'
        })
    })
});

export const ADDRESS_SELECTED_STYLE = new Style({
    image: new Circle({
        radius: 5,
        stroke: new Stroke({
            color: 'rgba(51,102,153,0.5)',
            width: 1.25
        }),
        fill: new Fill({
            color: '#336699'
        })
    })
});

export function parcelStyle(feature: Feature): Style {
    let owner: ParceProperties = feature.getProperties() as ParceProperties;
    return new Style({
        stroke: new Stroke({
            color: '#336699',
            width: 3,
            lineDash: [4, 10]
        }),
        fill: new Fill({
            color: 'transparent'
        }),
        text: new Text({
            offsetX: 5,
            offsetY: -5,
            text: `PIN: ${owner.Name}\nTax Payer: ${owner.Owner_Mail_Name}\nLocation: ${owner.FULLADDR}`,
            placement: getCenter(feature.getGeometry().getExtent())
        })
    });

}