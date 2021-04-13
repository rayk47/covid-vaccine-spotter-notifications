import { getDistanceFromZip, getLocation } from "../utils/LocationUtils";
import { IStoreData, getVaccineSpotterData } from "../vaccineSpotter/VaccineSpotter";

/**
 * Gets the list of stores that have vaccine appointments available withing a given distance
 * @param state the state where the user is looking for appointments
 * @param zipCode the zip code to use as a homebase
 * @param radius the distance from their homebase that is acceptable
 * @returns the list of stores with appointments available within a given distance
 */
 export async function getStoresWithVaccinesAvailableWithinDistance(state: string, zipCode:string, radius = 5): Promise<IStoreData[]> {
    const storesWithVaccineAppointments = await getStoresWithVaccinesAvailable(state);
    return await filterStoresByLocation(zipCode, storesWithVaccineAppointments, radius);
}

/**
 * Creates an array of store IDs from an array of StoreData
 * @param stores 
 * @returns an array of store ids from an array of IStoreData
 */
 export function getListofStoresById(stores:IStoreData[]):number[] {
    return stores.map(store => {
        return store.properties.id;
    })
}

/**
 * Filter the list of stores down to only stores with both doses available
 * @param state 
 * @returns the filtered list of stores with vaccine appointments available
 */
async function getStoresWithVaccinesAvailable(state: string): Promise<IStoreData[]> {
    const allStoreResults = await getVaccineSpotterData(state);
    return allStoreResults.features.filter(store => store.properties.appointments_available_all_doses === true);
}

/**
 * Filters stores by their location
 * @param fromZipCode 
 * @param stores 
 * @param maximumDistanceToStore 
 * @returns a list of stores within a given distance from a point
 */
async function filterStoresByLocation(fromZipCode:string, stores: IStoreData[], maximumDistanceToStore:number): Promise<IStoreData[]>{
    const fromLocation = await getLocation(fromZipCode);
    const storesWithinDistance = new Array<IStoreData>();
    for(const store of stores){
        const distanceToStore = await getDistanceFromZip(fromLocation.lat, fromLocation.lng, store.geometry.coordinates[1], store.geometry.coordinates[0]);
        if(distanceToStore < maximumDistanceToStore) {
            storesWithinDistance.push(store);
        }
    }
    return storesWithinDistance;
}