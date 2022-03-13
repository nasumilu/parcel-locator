

export type PopoverRenderFunction = {
    (properties: FeatureProperties): HTMLElement|string
};

export interface FeatureProperties {
    name: string|undefined,
}

export interface AddressCandidateProperties extends FeatureProperties {
        City: string,
        Country: string,
        DisplayX: number,
        DisplayY: number,
        Distance: number,
        LongLabel: string,
        Match_addr: string,
        Place_addr: string,
        Postal: string,
        PostalExt: string,
        Rank: number,
        Region: string,
        RegionAbbr: string,
        Score: number,
        ShortLabel: string,
        StName: string,
        StPreDir: string,
        StPreType: "",
        StType: string,
        Status: string,
        Subregion: string,
        X: number,
        Y: number,
        Xmax: number,
        Ymax: number,
        Xmin: number,
        Ymin: number
}

export interface EsriExtent {
    xmin: number,
    ymin: number,
    xmax: number,
    ymax: number
}

export interface AddressLocation {
    x: number,
    y: number
}

export interface AddressCandidate {

    adress: string,
    location: AddressLocation,
    extent: EsriExtent,
    score: number,
    attributes: AddressCandidateProperties
};

export interface AddressCanidateResults {

    candidates: Array<AddressCandidate>,
    spatialReference: {
        wkid: number,
        lastestWkid: number
    }
}

export interface ParceProperties extends FeatureProperties {

    Name: string,
    INC_MUNI: string,
    FULLADDR: string,
    Owner_Mail_Name: string,
    Owner_Mail_Addr1: string|null,
    Owner_Mail_Addr2: string|null,
    Owner_Mail_Addr3: string|null,
    Owner_Mail_City: string,
    Owner_Mail_State: string,
    Owner_Mail_Zip: string,
    StatedArea: number,
    Shape__Area: number,
    Shapp__Length: number
}