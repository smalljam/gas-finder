import { Fragment } from "react";
import { Fuel, FUELS } from "../types";

interface FuelSelectorItemProps {
  fuel: Fuel;
  selected: boolean;
  onChange: (selected: boolean) => void;
}
const FuelSelectorItem = ({
  fuel,
  selected,
  onChange,
}: FuelSelectorItemProps) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked)}
      />{" "}
      {fuel}
    </label>
  );
};

interface FuelSelectorProps {
  selected: Fuel[];
  onChange: (selected: Fuel[]) => void;
}
export const FuelSelector = ({ selected, onChange }: FuelSelectorProps) => {
  const isSelected = (fuel: Fuel) => selected.indexOf(fuel) > -1;
  const updateSelected = (fuel: Fuel, s: boolean) => {
    if (s && selected.indexOf(fuel) === -1) {
      onChange(selected.concat([fuel]));
    } else {
      onChange(selected.filter((f) => f !== fuel));
    }
  };
  return (
    <>
      {FUELS.map((f) => (
        <Fragment key={f}>
          <FuelSelectorItem
            fuel={f}
            selected={isSelected(f)}
            onChange={(s) => updateSelected(f, s)}
          />
        </Fragment>
      ))}
    </>
  );
};
