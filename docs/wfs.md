## Web Feature Service (WFS)

This project utilizes two web feature service to perform these two tasks:

1. Geocodes a single line address value into a rank list of *address candidates*. This *address canidates* are shown on the map as blue circles. The ESRI World Geocoder web service is used to perform this task.

    An overview of ESRI World Geocoder is found at https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm

2. Each *address canidate* upon adding to the map is used to perform a 
spatial join to obtain any parcels which it intersects. The Alachua County Property Appraisers Public Parcel web feature service is used 
to perform this task. 

    This service is found at https://services.arcgis.com/cNo3jpluyt69V8Ek/arcgis/rest/services/PublicParcel/FeatureServer/0