# SkyTrail AI — Engine Optimization & Travel Analytics

SkyTrail AI is a full-stack aviation analytics and travel visualization platform that evolved from a personal travel map into an AI-assisted engine optimization system inspired by real-world aerospace workflows.

The project combines geospatial visualization, flight route analytics, emissions modeling, and AI-powered optimization using modern web technologies including Next.js, TypeScript, Node.js, Mapbox GL, and Google Gemini.

---

## ✈️ Overview

This project began as an interactive world travel dashboard displaying personal flight routes on a live globe. It later expanded into an aerospace-focused analytics platform capable of:

- Visualizing global travel routes
- Computing great-circle flight distances
- Modeling aircraft engine fuel burn
- Estimating route emissions
- Using AI to recommend optimal engine assignments
- Simulating fleet-level efficiency improvements

The system demonstrates practical applications of:

- Full-stack engineering
- Geospatial computation
- AI integration
- Data visualization
- Environmental analytics
- Aviation-focused software workflows

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- React
- Mapbox GL JS v3
- @vis.gl/react-mapbox

### Backend
- Node.js
- Express.js
- REST APIs

### AI / Analytics
- Google Gemini API
- Emissions modeling
- Haversine distance calculations

### Tooling
- Git + GitHub
- Vercel
- ESLint
- GeoJSON
- Environment variable management

---

## 🌍 Features

### Interactive Flight Visualization
- Airport pins rendered globally
- Dynamic route generation using GeoJSON `LineString`
- Click-to-highlight airport interactions
- Hoverable route arcs with feature-state styling
- Responsive aviation-style UI

### Travel Dataset System
- Typed airport database using IATA codes
- Structured trip storage via local route arrays
- Coordinate validation and geographic safety checks

### Engine Optimization Module
- Calculates great-circle distances between airports
- Simulates emissions across multiple Rolls-Royce engine types
- Generates emissions tables for route × engine combinations
- Uses AI reasoning to recommend optimal engines per route

### AI Integration
- Google Gemini generates:
  - Route summaries
  - Optimization reasoning
  - Fleet efficiency insights
  - Emissions reduction recommendations

---

## 🧠 Architecture

```text
Frontend → Backend → AI Engine → Backend → Frontend → Visualization Layer
```

### Example Workflow
1. User selects or loads flight routes
2. Backend computes route distances
3. Engine dataset generates estimated fuel usage
4. Emissions are calculated for each engine option
5. Gemini analyzes optimization opportunities
6. Frontend visualizes optimized results and analytics

---

## 📂 Project Structure

```bash
.
├── backend/
├── frontend/
└── README.md
```

---

## 📍 Airport Data Example

```ts
export const AIRPORTS: Record<string, [number, number]> = {
  HND: [139.7798, 35.5494],
  IAD: [-77.4565, 38.9531],
  LHR: [-0.4543, 51.4700],
};
```

---

## ✈️ Route Example

```ts
export const TRIPS = [
  { origin: "IAD", destination: "HND" },
  { origin: "LHR", destination: "BCN" },
];
```

---

## 🔥 Engine Dataset Example

```ts
export const ENGINES = [
  { name: "Trent XWB", burnKgPerKm: 5.6 },
  { name: "Trent 1000", burnKgPerKm: 6.0 },
  { name: "Pearl 15", burnKgPerKm: 2.1 },
];
```

---

## 📊 Emissions Modeling

The system estimates route emissions using:

```ts
emissions = fuelBurnPerKm * distanceKm * 3.16
```

Where:
- `3.16` is the approximate CO₂ conversion factor for jet fuel.

---

## 🚀 Running Locally

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
npm run server
```

---

## 🔑 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
GEMINI_API_KEY=your_gemini_key
```

---

## 📈 Resume Highlights

- Built a full-stack aviation analytics platform using Next.js, TypeScript, Node.js, and Mapbox GL to visualize and analyze global travel routes.

- Developed emissions modeling and AI-assisted engine optimization workflows inspired by real-world aerospace engineering systems.

- Integrated Google Gemini to generate contextual flight insights and optimization recommendations from dynamically generated route datasets.

---

## 📚 Key Concepts Demonstrated

- Geospatial visualization
- REST API design
- AI feature integration
- State management
- Typed TypeScript architectures
- Data-driven UI rendering
- Environmental modeling
- Aviation analytics

---

## 📸 Inspiration

SkyTrail AI was inspired by:
- Aviation operations dashboards
- Flight tracking systems
- Aerospace optimization workflows
- Environmental efficiency analytics
- Interactive geographic storytelling

---

## 👤 Author

Lewis Wearmouth

---