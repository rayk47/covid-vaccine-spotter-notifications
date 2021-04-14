import { getDistance, convertDistance } from 'geolib';
import { LocationCache } from '../caches/LocationCache';

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
    const location = await LocationCache.getInstance().getLocationData(zipCode);
    return location.geometry.location;
}