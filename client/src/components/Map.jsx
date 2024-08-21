import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const INITIAL_CENTER = [20, 0];
const INITIAL_ZOOM = 2;

const Map = ({ data, year, selectedCountry }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const geoJsonRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    fetch('/countries.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  useEffect(() => {
    if (geoJsonRef.current && mapRef.current) {
      if (selectedCountry && selectedCountry !== 'World view') {
        const layer = geoJsonRef.current
          .getLayers()
          .find(
            (layer) =>
              layer.feature.properties.ADMIN.toLowerCase() ===
              selectedCountry.toLowerCase()
          );
        if (layer) {
          const bounds = layer.getBounds();
          mapRef.current.fitBounds(bounds);
          mapRef.current.closePopup();
          layer.openPopup();
        }
      } else {
        // Reset to initial view when "World view" is selected
        mapRef.current.setView(INITIAL_CENTER, INITIAL_ZOOM, { animate: true });
        mapRef.current.closePopup();
      }
    }
  }, [selectedCountry]);

  const getColor = (value) => {
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
      : '#FFEDA0';
  };

  const style = (feature) => {
    const countryData = data.find(
      (d) => d.country === feature.properties.ADMIN
    );
    return {
      fillColor: getColor(countryData ? countryData.total_adoptions : 0),
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
            const countryData = data.find(
              (d) => d.country === feature.properties.ADMIN
            );
            layer.bindPopup(`
              <strong>${feature.properties.ADMIN}</strong><br/>
              Total Adoptions: ${
                countryData ? countryData.total_adoptions : 'N/A'
              }
              ${year === 'all' ? ' (All Years)' : ` (${year})`}
            `);
          }}
        />
      )}
    </MapContainer>
  );
};

export default Map;
