export interface StationType {
  id: string;
  name: string;
  brand: string;
  street: string;
  place: string;
  lat: number;
  lng: number;
  dist: number;
  diesel: number;
  e5: number;
  e10: number;
  isOpen: boolean;
  houseNumber: string;
  postCode: number;
}

export const FUELS = ["diesel", "e5", "e10"] as const;
export type Fuel = typeof FUELS[number];
