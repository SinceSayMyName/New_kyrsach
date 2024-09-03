import { Company } from "./Company";
import { Transport } from "./Transport";

export type TransportOption = {
    id?: number;
    transport: Transport;
    departureCityCode: string;
    arrivalCityCode: string;
    company: Company;
    departureDate: Date;
    arrivalDate: Date;
    price: number;
    priceWithLuggage: number;
}