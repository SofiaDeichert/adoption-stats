import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const INITIAL_CENTER = [37.8, -96];
const INITIAL_ZOOM = 4;

const StateMap = ({ data, year, selectedState, onStateSelect }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const geoJsonRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    fetch('/us-states.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  useEffect(() => {
    if (geoJsonRef.current && mapRef.current) {
      if (selectedState) {
        const layer = geoJsonRef.current
          .getLayers()
          .find(
            (layer) =>
              layer.feature.properties.name.toLowerCase() ===
              selectedState.toLowerCase()
          );
        if (layer) {
          const bounds = layer.getBounds();
          mapRef.current.fitBounds(bounds);
          mapRef.current.closePopup();
          layer.openPopup();
        }
      } else {
        mapRef.current.setView(INITIAL_CENTER, INITIAL_ZOOM, { animate: true });
        mapRef.current.closePopup();
      }
    }
  }, [selectedState]);

  const getColor = (value, year) => {
    if (year === 'all') {
      // Color scale for "all years"
      return value > 5000
        ? '#800026'
        : value > 2500
        ? '#BD0026'
        : value > 1000
        ? '#E31A1C'
        : value > 500
        ? '#FC4E2A'
        : value > 250
        ? '#FD8D3C'
        : value > 100
        ? '#FEB24C'
        : value > 50
        ? '#FED976'
        : value > 25
        ? '#FFEDA0'
        : value > 0
        ? '#FFF7BC'
        : '#FFFFD9';
    } else {
      // Color scale for individual years
      return value > 1000
        ? '#800026'
        : value > 500
        ? '#BD0026'
        : value > 250
        ? '#E31A1C'
        : value > 100
        ? '#FC4E2A'
        : value > 50
        ? '#FD8D3C'
        : value > 25
        ? '#FEB24C'
        : value > 10
        ? '#FED976'
        : value > 5
        ? '#FFEDA0'
        : value > 0
        ? '#FFF7BC'
        : '#FFFFD9';
    }
  };

  const style = (feature) => {
    const stateData = data.find((d) => d.state === feature.properties.name);
    return {
      fillColor: getColor(stateData ? stateData.total_adoptions : 0, year),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer
      center={INITIAL_CENTER}
      zoom={INITIAL_ZOOM}
      style={{ height: '500px', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={style}
          ref={geoJsonRef}
          onEachFeature={(feature, layer) => {
            const stateData = data.find(
              (d) => d.state === feature.properties.name
            );
            layer.on({
              click: () => onStateSelect(feature.properties.name),
            });
            layer.bindPopup(`
              <strong>${feature.properties.name}</strong><br/>
              Total Adoptions: ${stateData ? stateData.total_adoptions : 'N/A'}
              ${year === 'all' ? ' (All Years)' : ` (${year})`}
            `);
          }}
        />
      )}
    </MapContainer>
  );
};

export default StateMap;
