import axios from 'axios';
import { getDistance, convertDistance } from 'geolib';

/**
 * Calculates the distance from one longitude and latitude point to another
 * @param fromLatitude 
 * @param fromLongitude 
 * @param toLatitude 
 * @param toLongitude 
 * @returns the distance between the two points
 */
export async function getDistanceFromZip(fromLatitude:number, fromLongitude:number, toLatitude:number, toLongitude:number): Promise<number>{
    const distance = getDistance(    
        { latitude: fromLatitude, longitude: fromLongitude },
        { latitude: toLatitude, longitude: toLongitude }
    )
    return convertDistance(distance, 'mi');
}

/**
 * Gets the location data of a zip code
 * Eventually it would make sense to cache this data so we do not have to keep reaching out to googles API
 * @param zipCode 
 * @returns the longitude and latitude points of a zip code
 */
export async function getLocation(zipCode:string): Promise<{lat:number, lng:number}> {
    const data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?region=us&address=${zipCode}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`);
    if(data?.data?.results?.[0]?.geometry?.location){
        return data.data.results[0].geometry.location;
    }
    throw new Error(`Could not find geometry of zip ${zipCode}`);
}