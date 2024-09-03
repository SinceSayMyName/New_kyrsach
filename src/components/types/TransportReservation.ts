import { TransportOption } from "./TransportOption";

export type TransportReservation = {
    id: number;
    transportOptions: TransportOption[];
    passengerCount: number;
    paid: boolean;
    withLuggage: boolean;
}