import { TRIPS_WITH_DISTANCE } from "./flights_with_distances.js";
import { getEligibleEngines } from "./engines_filter.js";

const CO2_PER_KG_FUEL = 3.16;
const FUEL_PRICE_USD_PER_KG = 0.85;

export function generateEmissionsTable() {
    const rows = [];

    for (const trip of TRIPS_WITH_DISTANCE) {
        const eligible = getEligibleEngines(trip.distanceKm);

        for (const engine of eligible) {
            const aircraftFuelBurnKg =
                trip.distanceKm * engine.aircraftBurnKgPerKm;

            const aircraftFuelCostUsd =
                aircraftFuelBurnKg * FUEL_PRICE_USD_PER_KG;

            const emissionsKg =
                (aircraftFuelBurnKg * CO2_PER_KG_FUEL) / engine.passengers;

            const fuelCostPerPassengerUsd =
                aircraftFuelCostUsd / engine.passengers;

            rows.push({
                origin: trip.origin,
                destination: trip.destination,
                distanceKm: trip.distanceKm,
                engine: engine.name,
                aircraftBurnKgPerKm: engine.aircraftBurnKgPerKm,
                passengers: engine.passengers,
                aircraftFuelBurnKg: Math.round(aircraftFuelBurnKg),
                aircraftFuelCostUsd: Number(aircraftFuelCostUsd.toFixed(2)),
                fuelCostPerPassengerUsd: Number(fuelCostPerPassengerUsd.toFixed(2)),
                emissionsKg: Math.round(emissionsKg),
            });
        }
    }

    return rows;
}