import { Fuel, StationType } from "../types";

import "./Station.css";

interface StationProps {
  station: StationType;
  selectedFuel: Fuel[];
}

export const Station = ({ station, selectedFuel }: StationProps) => {
  const { name, dist, isOpen, street, houseNumber, diesel, e5, e10 } = station;
  const isShown = (fuel: Fuel) =>
    selectedFuel.length ? selectedFuel.indexOf(fuel) > -1 : true;
  return (
    <div className={["station", !isOpen && "disabled"].join(" ")}>
      <h4>{name}</h4>
      <p>
        {dist}km: {[street, houseNumber].filter((f) => !!f).join(", ")}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isShown("diesel") && <div>diesel: {diesel}</div>}
        {isShown("e5") && <div>e5: {e5}</div>}
        {isShown("e10") && <div>e10: {e10}</div>}
      </div>
    </div>
  );
};
