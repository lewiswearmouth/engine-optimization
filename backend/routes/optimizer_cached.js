import express from "express";
import fs from "fs";
import path from "path";
import { buildOptimizerInput } from "../lib/optimizer_input.js";

const router = express.Router();

router.get("/optimizer-cached", (req, res) => {
    try {
        const filePath = path.join(process.cwd(), "data", "optimized_routes.json");
        const json = fs.readFileSync(filePath, "utf-8");
        const cachedData = JSON.parse(json);

        const optimizerInput = buildOptimizerInput();
        const emissionsTable = optimizerInput.emissionsTable;

        // Group all eligible route-engine options by route
        const grouped = {};
        for (const row of emissionsTable) {
            const key = `${row.origin}-${row.destination}`;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(row);
        }

        let optimizedTotalFuelCostUsd = 0;
        let worstCaseTotalFuelCostUsd = 0;

        const enrichedAssignments = (cachedData.optimalAssignments || []).map((assignment) => {
            const routeKey = `${assignment.origin}-${assignment.destination}`;
            const options = grouped[routeKey] || [];

            const chosen = options.find((row) => row.engine === assignment.engine);

            // Match the emissions logic: compare per-passenger fuel cost
            const worstCost = [...options].sort(
                (a, b) => b.fuelCostPerPassengerUsd - a.fuelCostPerPassengerUsd
            )[0];

            const optimizedFuelCostPerPassengerUsd =
                chosen?.fuelCostPerPassengerUsd ?? null;

            const worstCaseFuelCostPerPassengerUsd =
                worstCost?.fuelCostPerPassengerUsd ?? null;

            const moneySavedUsd =
                optimizedFuelCostPerPassengerUsd != null &&
                    worstCaseFuelCostPerPassengerUsd != null
                    ? Number(
                        (
                            worstCaseFuelCostPerPassengerUsd -
                            optimizedFuelCostPerPassengerUsd
                        ).toFixed(2)
                    )
                    : null;

            if (optimizedFuelCostPerPassengerUsd != null) {
                optimizedTotalFuelCostUsd += optimizedFuelCostPerPassengerUsd;
            }

            if (worstCaseFuelCostPerPassengerUsd != null) {
                worstCaseTotalFuelCostUsd += worstCaseFuelCostPerPassengerUsd;
            }

            console.log(
                routeKey,
                options.length,
                chosen?.engine,
                worstCost?.engine,
                optimizedFuelCostPerPassengerUsd,
                worstCaseFuelCostPerPassengerUsd,
                moneySavedUsd
            );

            return {
                ...assignment,
                optimizedFuelCostPerPassengerUsd,
                worstCaseFuelCostPerPassengerUsd,
                moneySavedUsd,
            };
        });

        const absoluteMoneySavedUsd = Number(
            (worstCaseTotalFuelCostUsd - optimizedTotalFuelCostUsd).toFixed(2)
        );

        const percentageMoneySaved =
            worstCaseTotalFuelCostUsd > 0
                ? Number(
                    (
                        (absoluteMoneySavedUsd / worstCaseTotalFuelCostUsd) *
                        100
                    ).toFixed(2)
                )
                : 0;

        const enrichedTotals = {
            ...(cachedData.totals || {}),
            optimizedTotalFuelCostUsd: Number(optimizedTotalFuelCostUsd.toFixed(2)),
            worstCaseTotalFuelCostUsd: Number(worstCaseTotalFuelCostUsd.toFixed(2)),
            absoluteMoneySavedUsd,
            percentageMoneySaved,
        };

        res.json({
            ...cachedData,
            optimalAssignments: enrichedAssignments,
            totals: enrichedTotals,
        });
    } catch (err) {
        console.error("Cache read error:", err);
        res.status(500).json({ error: "Failed to load cached optimizer data" });
    }
});

export default router;