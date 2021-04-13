import axios from 'axios';

/**
 * Pull the vaccine appointment data from https://www.vaccinespotter.org/
 * @param state that the appointment data is being pulled from
 * @returns 
 */
export async function getVaccineSpotterData(state: string): Promise<IStateData> {
    const data = await axios.get(`https://www.vaccinespotter.org/api/v0/states/${state}.json`);
    return data.data as IStateData;
}

/**
 * Rough interface for the data returned from https://www.vaccinespotter.org/
 */
export interface IStateData {
    features: IStoreData[],
    metadata: any
}

export interface IStoreData {
    geometry: {
        coordinates: number[],
        type: string
    },
    properties: {
        address: string,
        appointment_types: any,
        appointment_vaccine_types: any,
        appointments: [],
        appointments_available: boolean,
        appointments_available_2nd_dose_only: boolean,
        appointments_available_all_doses: boolean,
        appointments_last_fetched: string,
        appointments_last_modified: string,
        city: string,
        name: string,
        id: number,
        postal_code: string,
        provider: string,
        state: string,
        url: string
    },
    type: string
}