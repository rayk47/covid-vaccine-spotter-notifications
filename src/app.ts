import * as cron from 'node-cron';
import { sendEmail } from "./email/Gmail";
import { getListofStoresById, getStoresWithVaccinesAvailableWithinDistance } from './filter/FilterStores';
import dotenv from 'dotenv';
import { IStoreData } from './vaccineSpotter/VaccineSpotter';
dotenv.config();

//These should all be moved into their own class...if this was an API service they would be passed in an api call and stored in a db
const STATE = process.env.STATE || 'N/A';
const ZIPCODE = process.env.ZIPCODE || '00000';
const RADIUS = Number(process.env.RADIUS) || 5;

let previousListOfStoresWithAppt = new Array<number>();

/**
 * Run cron job every minute to check if new appointments are available
 */
cron.schedule('*/1 * * * *', () => {
    try {
        start();
    } catch (error) {
        console.log("Failed to run notification checker " + error);
    }
});

function start(){
    getStoresWithVaccinesAvailableWithinDistance(STATE, ZIPCODE, RADIUS).then(storesWithVaccines => {
        const currentListOfStoresWithAppt = getListofStoresById(storesWithVaccines);
        //Send a notification only if there is a new store added to the list
        if(currentListOfStoresWithAppt.length && currentListOfStoresWithAppt.some(r=> !previousListOfStoresWithAppt.includes(r))) {
            storesWithVaccines = storesWithVaccines.filter(store => {
                return isNewlyAdded(store, previousListOfStoresWithAppt);
            });
            sendEmail(STATE, ZIPCODE, RADIUS, storesWithVaccines);   
            previousListOfStoresWithAppt = currentListOfStoresWithAppt;      
        } else {
            console.log("No new appointments found");
        }
    });
}

function isNewlyAdded(store: IStoreData, previousListOfStoresWithAppt:number[]): boolean {
    if(previousListOfStoresWithAppt.includes(store.properties.id)){
        return false;
    }
    return true;
}