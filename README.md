# Intercountry Adoption Statistics Dashboard

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Overview

The Intercountry Adoption Statistics Dashboard is a comprehensive web application that visualizes and analyzes data related to international adoptions. This project aims to provide an intuitive interface for exploring adoption trends, comparing statistics across countries and states, and understanding the patterns of both incoming and outgoing adoptions in the United States.

## Features

- **Interactive Maps**: Visualize adoption data on world and US state maps.
- **Time-based Filtering**: Analyze adoption trends across different years.
- **Country and State Selection**: Focus on specific countries or US states for detailed analysis.
- **Multiple Data Views**:
  - Incoming Adoptions by Country of Origin
  - Incoming Adoptions by US State
  - Outgoing Adoptions from the US
  - Adoption Trends Over Time
- **Data Visualization**:
  - Bar Charts
  - Line Charts
  - Pie Charts
- **Responsive Design**: Optimized for various screen sizes and devices.

## Technologies Used

- **Frontend**:
  - React
  - Vite (for build tooling)
  - React Router (for navigation)
  - Recharts (for charts)
  - Leaflet (for maps)
  - TailwindCSS (for styling)
  - Mantine (for UI components)
- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
- **Data Source**: Travel.State.gov Intercountry Adoptions Annual Reports

## Usage

After starting the application, you'll be presented with the home page displaying four main sections:

1. **Incoming Adoptions by Country of Origin**: Explore statistics on adoptions to the United States from other countries.
2. **Incoming Adoptions by State**: Analyze adoption statistics for different states within the United States.
3. **Outgoing Adoptions**: View data on adoptions from the United States to other countries.
4. **Adoption Trends**: Analyze trends in intercountry adoptions over time.

Navigate through these sections using the top navigation bar. Each section provides interactive visualizations and filtering options to explore the data in depth.

## Project Structure

The project follows a standard React application structure:

```
src/
├── components/     # Reusable UI components
├── pages/          # Main page components
├── services/       # API service functions
├── hooks/          # Custom React hooks
├── App.jsx         # Main application component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

Key components:

- `CountryMap.jsx` and `StateMap.jsx`: Handle map visualizations
- `DataTable.jsx`: Displays tabular data
- `CustomBarChart.jsx` and `CustomLineChart.jsx`: Create various charts
- `YearFilter.jsx`, `CountrySelection.jsx`, `StateSelection.jsx`: Provide filtering options

## API Endpoints

The application interacts with a backend API. Here are the main endpoints used:

- `GET /api/years`: Fetch available years for data
- `GET /api/states`: Fetch list of US states
- `GET /api/countries`: Fetch list of countries
- `GET /api/incoming-adoptions/:year`: Fetch incoming adoption data for a specific year
- `GET /api/outgoing-adoptions/:year`: Fetch outgoing adoption data for a specific year
- `GET /api/incoming-adoptions-by-state/:year`: Fetch adoption data by state for a specific year

Replace `:year` with 'all' to get data for all years.
