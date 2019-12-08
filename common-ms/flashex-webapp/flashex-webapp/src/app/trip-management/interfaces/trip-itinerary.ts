import { IPacket } from '../interfaces/Packet';
import { IVehicle } from '../interfaces/vehicle';

export interface IItinerary {
  tripItineraryId: string;
  packets: IPacket[];
  plannedStartTime: Date;
  plannedEndTime: Date;
  plannedTotalDistance: number;
  vehicle: IVehicle;
  tripExpense: number;
  occupiedVolume: number;
  originAddress: string;
  algorithm: string;
  droppedPackets: IPacket[];
}
