import React, { Fragment, useEffect, useState } from "react";
import { usePosition } from "use-position";
import "./App.css";
import { BrandSelector } from "./components/BrandSelector";
import { FuelSelector } from "./components/FuelSelector";
import { Station } from "./components/Station";
import { Fuel, StationType } from "./types";

const API_KEY = "00000000-0000-0000-0000-000000000002";
const RADIUS = 50;

function App() {
  const { latitude, longitude } = usePosition(false);
  const [stations, setStations] =
    useState<StationType[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFuel, setSelectedFuel] = useState<Fuel[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/json/list.php?lat=${latitude}&lng=${longitude}&rad=${RADIUS}&sort=dist&type=all&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((r) => {
        setStations(r.stations);
        setLoading(false);
      })
      .catch((e) => setError(`${e}`));
  }, [latitude, longitude]);

  const filteredStations = selectedBrand
    ? stations?.filter((s) => s.brand === selectedBrand)
    : stations;

  const content = () => {
    if (error) {
      return (
        <div className="errorMessage">
          <h4>Error</h4>
          {error}
        </div>
      );
    }

    if (loading || stations === undefined) {
      return <div className="loadingMessage">Loading</div>;
    }

    return filteredStations?.length ? (
      <>
        <h3>
          {filteredStations.length} stations within {RADIUS}km
        </h3>
        {filteredStations.map((station) => (
          <Fragment key={station.id}>
            <Station station={station} selectedFuel={selectedFuel} />
          </Fragment>
        ))}
      </>
    ) : (
      <div className="emptyMessage">
        {selectedBrand && stations?.length ? (
          <>
            <p>Try differend brand.</p>
            <p>There are {stations.length} other stations.</p>
          </>
        ) : (
          `No stations within ${RADIUS}km.`
        )}
      </div>
    );
  };

  return (
    <div className="app">
      <header>
        <div className="brandSelector">
          <h5>Brand</h5>
          <BrandSelector onChange={(v) => setSelectedBrand(v || "")} />
        </div>
        <div className="fuelSelector">
          <h5>Fuel</h5>
          <FuelSelector selected={selectedFuel} onChange={setSelectedFuel} />
        </div>
      </header>
      <section>{content()}</section>
    </div>
  );
}

export default App;
