import axios from 'axios';
import NodeCache from 'node-cache';

export class LocationCache {
    public cache: NodeCache;

    private static instance : LocationCache;
    
    constructor(){
        this.cache = new NodeCache({});
    }

    public static getInstance(): LocationCache {
        if(!LocationCache.instance){
            LocationCache.instance = new LocationCache();
        }
        return LocationCache.instance;
    }

    public async getLocationData(zipCode:string): Promise<any> {
        if(LocationCache.getInstance().cache.has(zipCode)){
            return LocationCache.getInstance().cache.get(zipCode);
        }
        await LocationCache.getInstance().setLocationData(zipCode);
        return LocationCache.getInstance().cache.get(zipCode);
    }

    public async setLocationData(zipCode:string): Promise<void> {
        const data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?region=us&address=${zipCode}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`);
        if(data?.data?.results?.[0]?.geometry?.location){
            LocationCache.getInstance().cache.set(zipCode, data.data.results[0]);
            return;
        }
        throw new Error(`Could not find geometry of zip ${zipCode}`);
    }
}